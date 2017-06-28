import { Component, documentHelpers, FontAwesomeIcon as Icon, Input, Modal, SubstanceError as Err } from 'substance'
import { concat, debounce, find, findIndex, forEach, isEmpty } from 'lodash-es'

class ResourcesSelector extends Component {

  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadMore': this._loadMore,
      'updateEntity': this._updateEntity,
      'closeModal': this._doneEditing
    })
  }

  didMount() {
    if(this.state.search) {
      this.searchData()
    } else {
      this._loadData()
    }

    this.refs.searchInput.el.focus()
  }

  didUpdate(oldProps, oldState) {
    if(oldState.search !== this.state.search) {
      this.searchData()
    }
  }

  shouldRerender(newProps, newState) {
    if(this.state.focused !== newState.focused) {
      return false
    } else {
      return true
    }
  }

  getInitialState() {
    let editorConfigurator = this.context.editor.getConfigurator()
    let contextMapping = editorConfigurator.getContextMapping()
    let contexts = Object.keys(contextMapping)
    let entityTypes = []

    for (let i = 0; i < contexts.length; i++) {
      if(contextMapping[contexts[i]] === 'resources') {
        entityTypes.push(contexts[i])
      }
    }

    let doc = this.context.doc
    let sel = this.context.editorSession.getSelection()

    return {
      entityTypes: entityTypes,
      filters: {entityType: entityTypes},
      search: sel ? documentHelpers.getTextForSelection(doc, sel) : '',
      perPage: 30,
      order: 'created',
      direction: 'desc',
      pagination: false,
      node: this.props.node,
      items: []
    }
  }

  render($$) {
    let el = $$('div').addClass('sc-resource-selector')
    let ScrollPane = this.getComponent('scroll-pane')

    if (this.state.entityId) {
      let EntityEditor = this.getComponent('entity-editor')
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(EntityEditor, {entityId: this.state.entityId})
        )
      )
    }

    let header = $$('div').addClass('sc-panel-header').append(
      $$('div').addClass('sc-goback-action').append(
        this.context.iconProvider.renderIcon($$, 'goBackToList'),
        this.getLabel('goBackToResources')
      ).on('click', this._goBack)
    )

    let actions = $$('div').addClass('sc-actions')

    forEach(this.state.entityTypes, type => {
      actions.append(
        $$('div').addClass('sc-add-' + type + '-action').append(
          '+ ',
          this.context.iconProvider.renderIcon($$, type)
        ).on('click', this._createEntity.bind(this, type))
      )
    })

    header.append(actions)

    let searchInput = $$(Input, {
      type: 'search', 
      placeholder: this.getLabel('searchPlaceholder'),
      value: this.state.search
    }).ref('searchInput')

    searchInput.on('search', this._onSearch)
    searchInput.on('keyup', debounce(this._onSearch, 300))
    searchInput.on('keydown', this._onKeyDown)

    let search = $$('div').addClass('se-search').append(
      $$(Icon, {icon: 'fa-search'}),
      searchInput
    )

    el.append(
      header,
      search,
      $$(ScrollPane).addClass('se-search-results').append(
        this.renderList($$)
      ).ref('listResults')
    )

    return el
  }

  renderList($$) {
    let items = this.state.items
    let total = this.state.total
    let Pager = this.getComponent('pager')

    let entityEntries = $$("div")
      .addClass("se-entity-entries")
      .ref('entityEntries')

    if(items) {
      items.forEach((item) => {
        let EntityComp = this.getEntityRender(item.entityType)
        if(EntityComp) {
          let entry = $$(EntityComp, {
            data: item,
            entityId: item.entityId
          }).ref(item.entityId).on('click', this._setReference.bind(this, item.entityId))
          entityEntries.append(entry)
        }
      })
    }

    if(total > this.state.perPage) {
      entityEntries.append(
        $$(Pager, {
          total: total,
          loaded: items.length
        })
      )
    }

    return entityEntries
  }

  getEntityRender(entityType) {
    let configurator = this.props.configurator
    return configurator.getContextItem(entityType)
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

      if(pagination) {
        items = concat(this.state.items, res.records)
      } else {
        items = res.records
      }

      this.extendState({
        items: items,
        total: parseInt(res.total, 10)
      })
    }.bind(this))
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

  /*
    Load more data
  */
  _loadMore() {
    this.extendState({
      pagination: true
    })
    this.searchData()
  }

  _goBack() {
    let node = this.props.node
    if(node) {
      this.send('viewItem', node)
    } else {
      this.send('showList')
    }
  }

  _onSearch() {
    let searchValue = this.refs['searchInput'].val()
    if(searchValue !== this.state.search) {
      this.extendState({
        search: searchValue,
        focused: undefined,
        pagination: false
      })
    }
  }

  _onKeyDown(e) {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault()
      console.log(this.state.focused, 'has been chosen')
      this._setReference(this.state.focused)
    } else if (e.which === 38 || e.keyCode === 38) {
      e.preventDefault()
      let currentFocus = this.state.focused
      let items = this.state.items
      if (currentFocus !== undefined && items.length > 0) {
        let index = findIndex(items, item => { return item.entityId === currentFocus })
        if(index > 0) {
          let prevFocus = items[index - 1].entityId
          this.refs['listResults'].scrollTo(prevFocus)
          this.refs[currentFocus].extendProps({focus: false})
          this.refs[prevFocus].extendProps({focus: true})
          this.extendState({
            focused: prevFocus
          })
        }
      }
    } else if (e.which === 40 || e.keyCode === 40) {
      e.preventDefault()
      let currentFocus = this.state.focused
      let items = this.state.items
      if(currentFocus === undefined && items.length > 0) {
        let nextFocus = items[0].entityId
        this.refs[nextFocus].extendProps({focus: true})
        this.extendState({
          focused: nextFocus
        })
      } else if (items.length > 0) {
        let index = findIndex(items, item => { return item.entityId === currentFocus })
        if(items[index + 1] !== undefined) {
          let nextFocus = items[index + 1].entityId
          this.refs['listResults'].scrollTo(nextFocus)
          this.refs[currentFocus].extendProps({focus: false})
          this.refs[nextFocus].extendProps({focus: true})
          this.extendState({
            focused: nextFocus
          })
        } else if (this.state.total > index + 1) {
          this._loadMore()
        }
      }
    }
  }

  _setReference(entityId) {
    let editorSession = this.context.editorSession

    this._getAndStoreEntity(entityId, (err, entity) => {
      if(err) {
        console.error(err)
        return
      }

      let annoData = {
        type: entity.entityType,
        reference: entityId
      }

      editorSession._send({
        scope: "substance/collab", 
        type: "resourceSync", 
        documentId: editorSession.documentId, 
        resourceId: entityId, 
        mode: 'add'
      })

      if(this.state.node) {
        let doc = this.context.doc
        let node = doc.get(this.state.node)
        if(node.type === annoData.type) {
          editorSession.transaction((tx) => {
            //tx.set([this.state.node, 'type'], annoData.type)
            tx.set([this.state.node, 'reference'], annoData.reference)
          })
        } else {
          // Recreate annotation in case of entity type changing
          annoData.start = node.start
          annoData.end = node.end
          editorSession.transaction((tx) => {
            tx.delete(this.state.node)
            tx.create(annoData)
          })
        }
      } else {
        editorSession.transaction((tx) => {
          tx.annotate(annoData)
        })
      }
    })
  }

  _getAndStoreEntity(entityId, cb) {
    let resources = this.context.editorSession.resources
    let entity = find(resources, item => { return item.entityId === entityId })
    if(entity) {
      return cb(null, entity)
    } else {
      let resourceClient = this.context.resourceClient
      resourceClient.getEntity(entityId, (err, entity) => {
        if (err) return cb(err)
        resources.push(entity)
        return cb(null, entity)
      })
    }
  }

  /*
    Create a new entity 
  */
  _createEntity(entityType) {
    let resources = this.context.editorSession.resources
    let authenticationClient = this.context.authenticationClient
    let user = authenticationClient.getUser()
    let resourceClient = this.context.resourceClient
    let entityData = {
      name: 'Unknown ' + entityType,
      synonyms: [],
      description: '',
      entityType: entityType,
      userId: user.userId,
      updatedBy: user.userId,
      data: {}
    }

    resourceClient.createEntity(entityData, (err, entity) => {
      if(err) {
        console.error(err)
        return
      }

      resources.push(entity)
      this.extendState({entityId: entity.entityId})
    })
  }

  /*
    Update entity data in session resources
  */
  _updateEntity(entity) {
    let editorSession = this.context.editorSession
    let items = editorSession.resources
    let changedItem = findIndex(items, function(i) { return i.entityId === entity.entityId })
    
    if(changedItem > -1) {
      items[changedItem] = entity
    }
  }

  /*
    Close modal
  */
  _doneEditing() {
    this._setReference(this.state.entityId)
    this.extendState({entityId: undefined})
  }
}

export default ResourcesSelector