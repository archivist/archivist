import { Button, Component, FontAwesomeIcon as Icon, Input, ScrollPane, SubstanceError as Err } from 'substance'
import { concat, debounce, findIndex, isEmpty } from 'lodash-es'

class ResourcesOperator extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadMore': this._loadMore
    })
  }

  didMount() {
    if(this.state.search) {
      this.searchData()
    } else {
      this._loadData()
    }

    if(this.refs.searchInput) {
      this.refs.searchInput.el.focus()
    }
  }

  didUpdate(oldProps, oldState) {
    if(oldState.search !== this.state.search) {
      this.searchData()
    }
  }

  getInitialState() {
    let configurator = this.context.configurator
    let entityTypes = configurator.getDefaultResourceTypes()

    return {
      filters: {entityType: entityTypes},
      search: '',
      perPage: 30,
      order: 'created',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }

  shouldRerender(newProps, newState) {
    if(this.state.focused !== newState.focused) {
      return false
    } else {
      return true
    }
  }

  render($$) {
    let mode = this.props.mode
    let el = $$('div').addClass('sc-resource-operator')

    if(mode === 'delete') {
      el.append(this.renderDeleteDialog($$))
    } else if (mode === 'merge') {
      el.append(this.renderMergeDialog($$))
    } else {
      el.append($$('div').append('Error: please pass correct mode'))
    }

    return el
  }

  renderDeleteDialog($$) {
    let el = $$('div').addClass('se-delete-dialog')
    let state = this.state.opState
    let resource = this.renderResorceItem($$)
    let msg = $$('div').addClass('se-message')

    if(state === 'wait') {
      msg.addClass('se-info').append(
        $$(Icon, {icon: 'fa-circle-o-notch fa-spin'}).addClass('se-icon'),
        $$('div').addClass('se-content').append(this.getLabel('delete-wait-msg'))
      )
      el.append(msg)
    } else if(state === 'finish') {
      msg.addClass('se-success').append(
        $$(Icon, {icon: 'fa-thumbs-o-up'}).addClass('se-icon'),
        $$('div').addClass('se-content').append(this.getLabel('delete-finish-msg'))
      )
      el.append(msg)
    } else {
      msg.addClass('se-warning').append(
        $$(Icon, {icon: 'fa-warning'}).addClass('se-icon'),
        $$('div').addClass('se-content').append(this.getLabel('delete-confirmation-msg'))
      )
      el.append(
        resource,
        msg,
        $$('div').addClass('se-actions').append(
          $$(Button, {label: 'delete-confirmation-cancel', style: 'outline'})
            .on('click', this._onCancel),
          $$(Button, {label: 'delete-confirmation-submit', style: 'outline'})
            .on('click', this._onDelete)
        )
      )
    }

    return el
  }

  renderMergeDialog($$) {
    let el = $$('div').addClass('se-merge-dialog')
    let state = this.state.opState
    let resource = this.renderResorceItem($$)
    let mergeEntity = this.state.mergeEntity || this.props.mergeItem
    let mergeResource = this.renderResorceItem($$, mergeEntity)
    let resourceSelector = this.renderResorceSelector($$)
    let msg = $$('div').addClass('se-message')

    if(!state && mergeEntity) {
      msg.addClass('se-warning').append(
        $$(Icon, {icon: 'fa-warning'}).addClass('se-icon'),
        $$('div').addClass('se-content').append(this.getLabel('merge-confirmation-msg'))
      )

      if(this.state.mergeEntity) {
        mergeResource.on('click', this._unsetMergeEntity)
      }

      el.append(
        resource,
        $$('div').addClass('se-merge-divider').append(this.getLabel('merge-divider')),
        mergeResource,
        msg,
        $$('div').addClass('se-actions').append(
          $$(Button, {label: 'delete-confirmation-cancel', style: 'outline'})
            .on('click', this._onCancel),
          $$(Button, {label: 'merge-confirmation-submit', style: 'outline'})
            .on('click', this._onMerge)
        )
      )
    } else if (state === 'wait') {
      msg.addClass('se-info').append(
        $$(Icon, {icon: 'fa-circle-o-notch fa-spin'}).addClass('se-icon'),
        $$('div').addClass('se-content').append(this.getLabel('delete-wait-msg'))
      )
      el.append(msg)
    } else if (state === 'finish') {
      msg.addClass('se-success').append(
        $$(Icon, {icon: 'fa-thumbs-o-up'}).addClass('se-icon'),
        $$('div').addClass('se-content').append(this.getLabel('merge-finish-msg'))
      )
      el.append(msg)
    } else {
      el.append(
        resource,
        $$('div').addClass('se-merge-divider').append(this.getLabel('merge-divider')),
        resourceSelector
      )
    }

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
        let entry = this.renderResorceItem($$, item)
        entry.ref(item.entityId).attr("data-id", item.entityId)
          .on('click', this._setMergeEntity.bind(this, item.entityId))
        entityEntries.append(entry)
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

  renderResorceItem($$, data) {
    let el = $$('div').addClass('se-resource-item se-reference-item')
    let item = data || this.props.item

    if(item) {
      el.addClass('se-' + item.entityType)
      el.append(
        $$('div').addClass('se-type').append(item.entityType),
        $$('div').addClass('se-title').append(item.name),
        $$('div').addClass('se-resource-id').append(item.entityId),
        $$('div').addClass('se-description').setInnerHTML(item.description)
      )
    }

    return el
  }

  renderResorceSelector($$) {
    let el = $$('div').addClass('se-resource-item')
    let merge = this.state.mergeEntity

    if(!merge) {
      el.addClass('se-search-resource').append(
        $$(Icon, {icon: 'fa-search'}).addClass('se-icon'),
        $$(Input, {placeholder: this.getLabel('search-merge-placeholder'), value: this.state.search})
          .ref('searchInput')
          .on('keyup', debounce(this._onKeyUp, 300))
          .on('keydown', this._onKeyDown),
        $$(ScrollPane).addClass('se-search-results').append(
          this.renderList($$)
        ).ref('listResults')
      )

      if(this.state.total > 0) {
        el.addClass('se-suggestions-mode')
      }
    } else {
      el = this.renderResorceItem($$, merge)
        .on('click', this._showSearch)
    }

    return el
  }

  _setMergeEntity(entityId) {
    let items = this.state.items
    let index = findIndex(items, item => { return item.entityId === entityId })
    this.extendState({mergeEntity: items[index]})
  }

  _unsetMergeEntity() {
    this.extendState({mergeEntity: undefined})
  }

  _showSearch() {
    this.extendState({mergeEntity: undefined})
  }

  _onCancel() {
    this.send('closeResourceOperator')
  }

  _onDelete() {
    let entityId = this.props.entityId
    let resourceClient = this.context.resourceClient
    this.extendState({opState: 'wait'})
    resourceClient.deleteEntity(entityId, (err) => {
      this.extendState({opState: 'finish'})
      setTimeout(() => {
        this.send('deleteEntity', entityId)
      }, 1000)
    })
  }

  _onMerge() {
    let entityId = this.props.item.entityId || this.props.entityId
    let mergeEntity = this.state.mergeEntity || this.props.mergeItem
    let mergeEntityId = mergeEntity.entityId || this.props.mergeEntityId

    if(entityId !== mergeEntityId) {
      let resourceClient = this.context.resourceClient
      let type = mergeEntity.entityType
      this.extendState({opState: 'wait'})
      resourceClient.mergeEntity(entityId, mergeEntityId, type, (err) => {
        this.extendState({opState: 'finish'})
        setTimeout(() => {
          this.send('deleteEntity', entityId)
        }, 1000)
      })
    }
  }

  _onKeyUp() {
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
      this._setMergeEntity(this.state.focused)
    } else if (e.which === 38 || e.keyCode === 38) {
      e.preventDefault()
      let currentFocus = this.state.focused
      let items = this.state.items
      if (currentFocus !== undefined && items.length > 0) {
        let index = findIndex(items, item => { return item.entityId === currentFocus })
        if(index > 0) {
          let prevFocus = items[index - 1].entityId
          this.refs['listResults'].scrollTo(prevFocus)
          this.refs[currentFocus].removeClass('se-focused')
          this.refs[prevFocus].addClass('se-focused')
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
        this.refs[nextFocus].addClass('se-focused')
        this.extendState({
          focused: nextFocus
        })
      } else if (items.length > 0) {
        let index = findIndex(items, item => { return item.entityId === currentFocus })
        if(items[index + 1] !== undefined) {
          let nextFocus = items[index + 1].entityId
          this.refs['listResults'].scrollTo(nextFocus)
          this.refs[currentFocus].removeClass('se-focused')
          this.refs[nextFocus].addClass('se-focused')
          this.extendState({
            focused: nextFocus
          })
        } else if (this.state.total > index + 1) {
          this._loadMore()
        }
      }
    }
  }

  _loadResource() {
    let entityId = this.props.entityId
    let resourceClient = this.context.resourceClient

    resourceClient.getEntity(entityId, (err, entity) => {
      if(err) {
        console.error(err)
        this.setState({
          error: new Error('Entity loading failed')
        })
        return
      }

      this.extendState({item: entity})
    })
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
        total: parseInt(res.total, 10),
        loading: false
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
        total: parseInt(res.total, 10),
        loading: false
      })
    })
  }

  /*
    Load more data
  */
  _loadMore() {
    if(!this.state.loading) {
      this.extendState({
        pagination: true,
        loading: true
      })
      this.searchData()
    }
  }
}

export default ResourcesOperator