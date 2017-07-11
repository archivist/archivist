import { Button, Component, EventEmitter, FontAwesomeIcon as Icon, Grid, Input, Layout, Modal, SplitPane, SubstanceError as Err } from 'substance'
import { concat, forEach, findIndex, isEmpty, isEqual } from 'lodash-es'
import moment from 'moment'
import AbstractEntityRow from './AbstractEntityRow'

class AbstractEntityPage extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadMore': this._loadMore,
      'loadReferences': this._loadReferences,
      'updateEntity': this._updateEntity,
      'deleteEntity': this._removeFromList,
      'mergeItem': this._mergeItem,
      'removeItem': this._removeItem,
      'closeModal': this._doneEditing,
      'closeResourceOperator': this._closeResourceOperator,
      'newEntity': this._newEntity
    })
  }

  get pageName() {
    return this.constructor.pageName
  }

  get entityType() {
    return this.constructor.entityType
  }

  getChildContext() {
    // TODO: we only keeping this to avoid
    // ScrollPane dispose errors
    return {
      editorSession: new EventEmitter(),
      dragManager: new EventEmitter()
    }
  }

  getInitialState() {
    return {
      active: {},
      filters: {entityType: this.entityType},
      dataFilters: {},
      search: '',
      fts: false,
      perPage: 30,
      order: 'created',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }

  didMount() {
    this._loadData()
  }

  didUpdate(oldProps, oldState) {
    if(oldState.search !== this.state.search || !isEqual(oldState.dataFilters, this.state.dataFilters)) {
      this.searchData()
    }
  }

  render($$) {
    let items = this.state.items
    let el = $$('div').addClass('sc-entity-page')
    let main = $$('div').addClass('se-entity-layout')

    let header = this.renderHeader($$)

    let toolbox = this.renderToolbox($$)
    main.append(toolbox)

    if (this.props.entityId || this.state.dialog) {
      let EntityEditor = this.getComponent('entity-editor')
      main.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(EntityEditor, {entityId: this.props.entityId})
        ).ref('modal')
      )
    }

    if(this.state.entityId && this.state.mode) {
      let ResourceOperator = this.getComponent('resource-operator')
      let index = findIndex(items, (i) => { return i.entityId === this.state.entityId })
      main.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(ResourceOperator, {entityId: this.state.entityId, item: items[index], mode: this.state.mode})
        ).ref('modal')
      )
    }

    if (items) {
      if (items.length > 0) {
        main.append(this.renderFull($$))
      } else {
        main.append(this.renderEmpty($$))
      }
    }

    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeA: '40px'}).append(
        header,
        main
      )
    )

    return el
  }

  renderFilters($$) {
    let filters = []
    let search = $$('div').addClass('se-search').append(
      $$(Icon, {icon: 'fa-search'})
    )
    let searchInput = $$(Input, {type: 'search', placeholder: 'Search...'})
      .ref('searchInput')

    if(this.isSearchEventSupported) {
      searchInput.on('search', this._onSearch)
    } else {
      searchInput.on('keypress', this._onSearchKeyPress)
    }

    let FTSSwitcher = $$('span').addClass('se-fts-switch')
      .append('fts')
      .on('click', this._switchFTS)

    if(this.state.fts) FTSSwitcher.addClass('se-active')

    search.append(
      searchInput,
      FTSSwitcher
    )

    filters.push(search)

    return filters
  }

  renderHeader($$) {
    let Header = this.getComponent('header')
    return $$(Header)
  }

  renderToolbox($$) {
    let Toolbox = this.getComponent('toolbox')
    let filters = this.renderFilters($$)

    let toolbox = $$(Toolbox, {
      actions: {
        'newEntity': '+ Add ' + this.entityType
      },
      content: filters
    })

    return toolbox
  }

  renderStatusBar($$) {
    let componentRegistry = this.context.componentRegistry
    let StatusBar = componentRegistry.get('status-bar')

    return $$(StatusBar)
  }

  renderEmpty($$) {
    let layout = $$(Layout, {
      width: 'medium',
      textAlign: 'center'
    })

    if(this.state.total === 0) {
      layout.append(
        $$('h1').html(
          'No results'
        ),
        $$('p').html('Sorry, no entities matches your query')
      )
    } else {
      let Spinner = this.getComponent('spinner')
      layout.append($$(Spinner, {message: 'spinner-loading'}))
    }

    return layout
  }

  renderEntityIcon($$) {
    return $$(Icon, {icon: 'fa-users'})
  }

  renderAdditionalMenu($$, actions) {
    let el = $$('div').addClass('se-more').attr({'tabindex': 0})
    let actionsList = $$('ul').addClass('se-more-content')
    forEach(actions, action => {
      actionsList.append(
        $$('li').addClass('se-more-item').append(
          $$(Button, {label: action.label}).on('click', action.action)
        )
      )
    })
    el.append(actionsList)

    return el
  }

  renderFull($$) {
    let items = this.state.items
    let total = this.state.total
    let Pager = this.getComponent('pager')
    let RowComponent = this.getRowClass()
    let grid = $$(Grid)

    if(items) {
      items.forEach((item) => {
        grid.append(
          $$(RowComponent, {pageName: this.pageName, item: item}).ref(item.entityId)
        )
      })
    }

    if(total > this.state.perPage) {
      grid.append(
        $$(Pager, {
          total: total,
          loaded: items.length
        })
      )
    }

    return grid
  }

  getRowClass() {
    return AbstractEntityRow
  }

  /*
    Search entities
  */
  searchData() {
    let searchValue = this.state.search

    if(isEmpty(searchValue) || !this.state.fts) {
      return this._loadData()
    }

    let language = 'russian'
    let initialState = this.getInitialState()
    let filters = initialState.filters
    let dataFilters = this.state.dataFilters
    let perPage = this.state.perPage
    let order = this.state.order
    let direction = this.state.direction
    let pagination = this.state.pagination
    let items = []
    let options = {
      limit: perPage, 
      offset: pagination ? this.state.items.length : 0,
      order: order + ' ' + direction
    }
    let resourceClient = this.context.resourceClient

    forEach(dataFilters, (value, prop) => {
      let selector = "data->>'" + prop + "'"
      filters[selector] = value
    })

    resourceClient.searchEntities(searchValue, language, filters, options, function(err, res) {
      if (err) {
        this.setState({
          error: new Err('DocumentsPage.SearchError', {
            message: 'Search results could not be loaded.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }

      let details = findIndex(res.records, function(record) {
        return record.fragments
      })

      if(pagination) {
        items = concat(this.state.items, res.records)
      } else {
        items = res.records
      }

      this.extendState({
        items: items,
        total: parseInt(res.total, 10),
        details: details
      })
    }.bind(this))
  }

  /*
    Load more data
  */
  _loadMore() {
    this.extendState({
      pagination: true
    })
    this.searchData()
  }

  /*
    Create a new entity 
  */
  _newEntity() {
    let authenticationClient = this.context.authenticationClient
    let user = authenticationClient.getUser()
    let resourceClient = this.context.resourceClient
    let items = this.state.items
    let entityData = {
      name: 'Unknown ' + this.entityType,
      synonyms: [],
      description: '',
      entityType: this.entityType,
      userId: user.userId,
      updatedBy: user.userId,
      data: {}
    }

    resourceClient.createEntity(entityData, (err, entity) => {
      if (err) {
        this.setState({
          error: new Err('EntitiesPage.CreateError', {
            message: 'Entity could not be created.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }

      entity.count = 0
      items.unshift(entity)

      this.send('navigate', {page: this.pageName, entityId: entity.entityId})
    })
  }

  _removeItem(id) {
    this.extendState({entityId: id, mode: 'delete'})
  }

  _removeFromList(id) {
    let items = this.state.items
    let deletedItem = findIndex(items, function(i) { return i.entityId === id })
    if(deletedItem > -1) {
      items.splice(deletedItem, 1)
      this.extendState({items: items, entityId: undefined, mode: undefined})
    }
  }

  _mergeItem(id) {
    this.extendState({entityId: id, mode: 'merge'})
  }

  /*
    Close Resource Operator modal
  */
  _closeResourceOperator() {
    this.extendState({entityId: undefined, mode: undefined})
  }

  /*
    Close modal and change url
  */
  _doneEditing() {
    // TODO: form editor isn't disposing, we shouldn't do it manually
    this.refs.modal.triggerDispose()
    this.extendState({entityId: undefined, mode: undefined})
    this.send('navigate', {page: this.pageName})
  }

  /*
    Update grid data
  */
  _updateEntity(entity) {
    let item = this.refs[entity.entityId]
    let index = findIndex(this.state.items, (i) => { return i.entityId === entity.entityId })
    if(item) {
      item.extendProps({item: entity})
    }
    if(index > -1) {
      this.state.items[index] = entity
    }
  }

  /*
    Loads entities
  */
  _loadData() {
    let resourceClient = this.context.resourceClient
    let initialState = this.getInitialState()
    let filters = initialState.filters
    let dataFilters = this.state.dataFilters
    let perPage = this.state.perPage
    let order = this.state.order
    let direction = this.state.direction
    let pagination = this.state.pagination
    let items = []
    let options = {
      limit: perPage, 
      offset: pagination ? this.state.items.length : 0,
      order: order + ' ' + direction
    }

    forEach(dataFilters, (value, prop) => {
      let selector = "data->>'" + prop + "'"
      filters[selector] = value
    })

    let searchValue = this.state.search
    if(searchValue) {
      filters['or'] = [
        {'name ~*': searchValue},
        {'synonyms::text ~*': searchValue}
      ]
    }

    resourceClient.listEntities(filters, options, (err, res) => {
      if (err) {
        this.setState({
          error: new Err('EntitiesPage.LoadingError', {
            message: 'Entities could not be loaded.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }

      if(pagination) {
        items = concat(this.state.items, res.records)
      } else {
        items = res.records
      }

      this.extendState({
        items: items,
        total: parseInt(res.total, 10)
      })
    })
  }

  _loadReferences(entityId) {
    let filters = {}
    let options = {
      columns: ['"documentId"', 'title'],
      order: '"updatedAt" DESC'
    }
    let documentClient = this.context.documentClient
    let item = this.refs[entityId]
    if(item) {
      if(!item.props.references) {
        documentClient.getReferences(entityId, filters, options, function(err, references) {
          if (err) {
            this.setState({
              error: new Err('EntitiesPage.GetReferencesError', {
                message: 'Search results could not be loaded.',
                cause: err
              })
            })
            console.error('ERROR', err)
            return
          }

          item.extendProps({references: references})
          item._toggleDetails()
        }.bind(this))
      } else {
        item._toggleDetails()
      } 
    }
  }

  _onSearchKeyPress(e) {
    // Perform search query on pressing enter
    if (e.which === 13 || e.keyCode === 13) {
      let searchValue = this.refs['searchInput'].val()
      this.extendState({
        search: searchValue,
        pagination: false
      })
      return false;
    }
  }

  _onSearch() {
    let searchValue = this.refs['searchInput'].val()
    this.extendState({
      search: searchValue,
      pagination: false
    })
  }

  _switchFTS() {
    let currentValue = this.state.fts
    this.extendState({fts: !currentValue})
  }

  isSearchEventSupported() {
    let element = document.createElement('input')
    let eventName = 'onsearch'
    let isSupported = (eventName in element)
    
    return isSupported
  }
}

export default AbstractEntityPage
