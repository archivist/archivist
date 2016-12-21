import { Component, FontAwesomeIcon as Icon, Grid, Input, Layout, Modal, SubstanceError as Err } from 'substance'
import concat from 'lodash/concat'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'

import moment from 'moment'

// Sample data for debugging
// import DataSample from '../../data/docs'

class AbstractEntityPage extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadMore': this._loadMore,
      'updateEntity': this._updateEntity,
      'closeModal': this._doneEditing
    })
  }

  get pageName() {
    return this.constructor.pageName
  }

  getInitialState() {
    return {
      edit: false,
      active: {},
      filters: {},
      search: '',
      dialog: false,
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
    if(oldState.search !== this.state.search) {
      this.searchData()
    }
  }

  render($$) {
    let items = this.state.items
    let el = $$('div').addClass('sc-entity-page')

    let header = this.renderHeader($$)
    el.append(header)

    let toolbox = this.renderToolbox($$)
    el.append(toolbox)

    if (this.props.entityId) {
      let EntityEditor = this.getComponent('entity-editor')
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(EntityEditor, {entityId: this.props.entityId})
        )
      )
    }

    if (!items) {
      return el
    }

    if (items.length > 0) {
      el.append(this.renderFull($$))
    } else {
      el.append(this.renderEmpty($$))
    }

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
    search.append(searchInput)

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
        'newEntity': '+ New Entity'
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
      layout.append(
        $$('div').addClass('se-spinner').append(
          $$('div').addClass('se-rect1'),
          $$('div').addClass('se-rect2'),
          $$('div').addClass('se-rect3'),
          $$('div').addClass('se-rect4'),
          $$('div').addClass('se-rect5')
        ),
        $$('h2').html(
          'Loading...'
        )
      )
    }

    return layout
  }

  renderEntityIcon($$) {
    return $$(Icon, {icon: 'fa-users'})
  }

  renderFull($$) {
    let urlHelper = this.context.urlHelper
    let items = this.state.items
    let total = this.state.total
    let Pager = this.getComponent('pager')
    let grid = $$(Grid)

    if (items) {
      items.forEach((item, index) => {
        let url = urlHelper.openEntity(this.pageName, item.entityId)
        let entityIcon = this.renderEntityIcon($$)
        let name = $$('a').attr({href: url}).append(item.name)
        let updatedAt = ['Updated', moment(item.updatedAt).fromNow(), 'by', item.updatedBy].join(' ')
        let more = $$(Icon, {icon: 'fa-ellipsis-v'})

        let row = $$(Grid.Row).addClass('se-entity-meta').ref(item.entityId).append(
          $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(entityIcon),
          $$(Grid.Cell, {columns: 5}).addClass('se-title').append(name),
          $$(Grid.Cell, {columns: 3}).append(updatedAt),
          $$(Grid.Cell, {columns: 2}).append(item.count ? item.count + ' documents' : ''),
          $$(Grid.Cell, {columns: 1}).addClass('se-more').append(more)
        ).on('click', this._loadReferences.bind(this, item.entityId, index))

        if(item.description) {
          row.append(
            $$(Grid.Row).addClass('se-entity-description').append(
              $$('div').addClass('se-cell se-description').setInnerHTML(item.description)
            )
          )
        }

        grid.append(row)

        if(this.state.details === index && item.references) {
          item.references.forEach(function(reference) {
            let referenceIcon = $$(Icon, {icon: 'fa-file-text-o'})
            grid.append(
              $$(Grid.Row).addClass('se-document-reference').ref(reference.documentId).append(
                $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(referenceIcon),
                $$(Grid.Cell, {columns: 11}).addClass('se-reference').append(reference.title)
              )
            )
          })
        }
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

  /*
    Search entities
  */
  searchData() {
    let searchValue = this.state.search

    if(isEmpty(searchValue)) {
      return this._loadData()
    }

    let language = 'russian'
    let filters = this.state.filters
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
    Close modal and change url
  */
  _doneEditing() {
    this.send('navigate', {page: this.pageName})
  }

  /*
    Update grid data
  */
  _updateEntity(entity) {
    let items = this.state.items
    let changedItem = findIndex(items, function(i) { return i.entityId === entity.entityId })
    if(changedItem > -1) {
      items[changedItem] = entity
      this.extendState({items: items})
    }
  }

  /*
    Loads entities
  */
  _loadData() {
    let resourceClient = this.context.resourceClient
    let filters = this.state.filters
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


  _loadReferences(entityId, index) {
    let filters = {}
    let options = {
      columns: ['"documentId"', 'title'],
      order: '"updatedAt" DESC'
    }
    let documentClient = this.context.documentClient
    let items = this.state.items

    if(!items[index].references) {
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

        items[index].references = references.records

        this.extendState({
          items: items,
          details: index 
        })
      }.bind(this))
    } else {
      this.extendState({details: index})
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

  isSearchEventSupported() {
    let element = document.createElement('input')
    let eventName = 'onsearch'
    let isSupported = (eventName in element)
    
    return isSupported
  }
}

export default AbstractEntityPage
