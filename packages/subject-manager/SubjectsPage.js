import { Button, Component, FontAwesomeIcon as Icon, Grid, Input, Layout, Modal, SubstanceError as Err } from 'substance'
import concat from 'lodash/concat'
import delay from 'lodash/delay'
import each from 'lodash/each'
import findIndex from 'lodash/findIndex'
import flattenDeep from 'lodash/flattenDeep'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import moment from 'moment'

// Sample data for debugging
// import DataSample from '../../data/docs'

class SubjectsPage extends Component {
  constructor(...args) {
    super(...args)

    this.dragSource = null
    this.currentTarget = null
    this.handleActions({
      'newSubject': this._newSubject
    })
  }


  getInitialState() {
    return {
      active: {},
      filters: {entityType: 'subject'},
      search: '',
      perPage: 1000,
      order: 'cast(data->>\'position\' as integer)',
      direction: 'asc',
      pagination: false,
      items: {}
    }
  }

  didMount() {
    this._loadData()
  }

  render($$) {
    let items = this.state.items
    let el = $$('div').addClass('sc-subjects-page')

    let header = this.renderHeader($$)
    el.append(header)

    let toolbox = this.renderToolbox($$)
    el.append(toolbox)

    if (isEmpty(items)) {
      el.append(this.renderEmpty($$))
    } else {
      el.append(this.renderFull($$))
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
        'newSubject': '+ Add subject'
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
        $$('p').html('Sorry, no subjects matches your query')
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

  renderAdditionalMenu($$, actions) {
    let el = $$('div').addClass('se-more').attr({'tabindex': 0})
    let actionsList = $$('ul').addClass('se-more-content')
    each(actions, action => {
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
    let urlHelper = this.context.urlHelper
    let items = this.state.items
    let grid = $$(Grid)

    if(items) {
      let childNodes = items.getRoots()
      childNodes = sortBy(childNodes, ['position'])

      let childEls = childNodes.map(function(node) {
        return this.renderChildren($$, node, 1)
      }.bind(this))

      grid.append(flattenDeep(childEls))
    }

    return grid
  }

  renderChildren($$, node, level) {
    let items = this.state.items
    let edited = ['Updated', moment(node.edited).fromNow(), 'by', node.updatedBy].join(' ')
    let isExpanded = node.expanded
    let childNodes = items.getChildren(node.id)
    childNodes = sortBy(childNodes, ['position'])
    let hideExpand = isEmpty(childNodes)
    let childrenEls = []

    if(isExpanded) {
      childrenEls = map(childNodes, function(сhildNode) {
        return this.renderChildren($$, сhildNode, level + 1)
      }.bind(this))
    }

    let title = $$(Grid.Cell, {columns: 6}).addClass('se-title')
    title.addClass('se-level-' + level)
    if(!hideExpand) {
      let expandedIcon = isExpanded ? 'expanded' : 'collapsed'
      title.append(
        this.context.iconProvider.renderIcon($$, expandedIcon).addClass('se-collapse')
      )
    }
    title.append($$('span').addClass('se-tree-node-name').append(node.name))

    let additionalActions = [
      {label: 'Delete', action: this._removeItem.bind(this, node.id)},
      {label: 'Merge into', action: this._mergeInto.bind(this, node.id)}
    ]

    if(hideExpand) {
      additionalActions.push({label: 'Merge', action: this._merge.bind(this, node.id)})
    }

    let el = $$('div').addClass('se-row se-tree-node').append(
      title,
      $$(Grid.Cell, {columns: 3}).append(edited),
      $$(Grid.Cell, {columns: 2}).append(node.count ? node.count + ' documents' : '0 documents'),
      $$(Grid.Cell, {columns: 1}).addClass('se-additional').append(
        this.renderAdditionalMenu($$, additionalActions)
      ).on('click', function(e) {
        e.stopPropagation()
      })
    )
    .ref(node.id)
    .on('click', this._expandNode.bind(this, node.id))
    .attr({draggable: true})
    .on('dragstart', this._onDragStart.bind(this, node.id))
    .on('dragend', this._onDragEnd)
    .on('dragover', this._onDragOver.bind(this, node.id))

    if(node.description) {
      el.append(
        $$(Grid.Row).addClass('se-tree-node-description').append(
          $$('div').addClass('se-cell se-description').setInnerHTML(node.description)
        )
      )
    }

    return concat(el, childrenEls);
  }

  _expandNode(id, e) {
    e.preventDefault()
    e.stopPropagation()
    let items = this.state.items
    let isExpanded = items.get([id, 'expanded'])
    items.set([id, 'expanded'], !isExpanded)
    this.extendProps({
      items: items
    })
  }

  _onDragStart(id, e) {
    this._initDrag(id, e)
  }

  _onDragEnd() {
    if(this.currentState === 'after' || this.currentState === 'before' ) {
      this._moveItem(this.dragSource, this.currentTarget, this.currentState)
    }
    this.dragSource = null
    this.currentTarget = null
    this.currentDrillTarget = null
    this.currentState = null
  }

  _onDragOver(id, e) {
    this.currentTarget = id
    let dropTarget = e.currentTarget
    let activeEls = dropTarget.parentElement.querySelectorAll('.se-drop-before, .se-drop-after, .se-drop-drill')
    for (let i = activeEls.length - 1; i >= 0; i--) {
      activeEls[i].classList.remove('se-drop-before', 'se-drop-after', 'se-drop-drill')
    }
    let elHeight = e.currentTarget.offsetHeight
    let hasChildren = this.state.items.hasChildren(id)
    let after = hasChildren ? e.offsetY > elHeight/4*3 : e.offsetY >= elHeight/2
    let before = hasChildren ? e.offsetY < elHeight/4 : e.offsetY < elHeight/2
    if(after) {
      dropTarget.classList.add('se-drop-after')
      this.currentState = 'after'
    } else if (before) {
      dropTarget.classList.add('se-drop-before')
      this.currentState = 'before'
    } else if (hasChildren) {
      dropTarget.classList.add('se-drop-drill')
      if(this.currentDrillTarget !== id && this.dragSource !== id) {
        this.currentState = 'drill'
        this.currentDrillTarget = id
        delay((id, e) => {
          if(this.currentTarget === id && this.currentState === 'drill') {
            this._expandNode(id, e)
          }
        }, 500, id, e)
      }
    }
  }

  _initDrag(id) {
    this.dragSource = id
    this.currentTarget = id
  }

  _moveItem(source, target, pos) {
    console.log('moving', source, pos, target)
    let items = this.state.items

    let sourcePos = items.get([source, 'position'])
    let sourceParent = items.get([source, 'parent'])
    let dropPos = items.get([target, 'position'])
    let targetPos = pos === 'before' ? dropPos : dropPos + 1
    let targetParent = items.get([target, 'parent'])

    if(sourceParent === targetParent && sourcePos > targetPos) {
      this._fixSourceLeaf(items, sourcePos, sourceParent)
    }

    let targetSiblings = targetParent !== null ? items.getChildren(targetParent) : items.getRoots()
    each(targetSiblings, node => {
      if(node.position >= targetPos) {
        items.set([node.id, 'position'], node.position + 1)
      }
    })
    console.log('new position', targetPos)
    items.set([source, 'position'], targetPos)
    items.set([source, 'parent'], targetParent)

    if(sourceParent !== targetParent || sourcePos <= targetPos) {
      this._fixSourceLeaf(items, sourcePos, sourceParent)
    }

    // debugging
    window.subjects = items
    let tSiblings = targetParent !== null ? items.getChildren(targetParent) : items.getRoots()
    let tPositions = []
    each(tSiblings, n => {
      tPositions.push(n.position)
    })
    console.log('target positions', tPositions)
    let sSiblings = sourceParent !== null ? items.getChildren(sourceParent) : items.getRoots()
    let sPositions = []
    each(sSiblings, n => {
      sPositions.push(n.position)
    })
    console.log('source positions', sPositions)

    this.extendProps({
      items: items
    })
  }

  _fixSourceLeaf(items, sourcePos, sourceParent) {
    let sourceSiblings = sourceParent !== null ? items.getChildren(sourceParent) : items.getRoots()
    each(sourceSiblings, node => {
      if(node.position >= sourcePos) {
        items.set([node.id, 'position'], node.position - 1)
      }
    })
  }

  _removeItem(id) {
    console.log(id)
  }

  _mergeInto(id) {
    console.log(id)
  }

  _merge(id) {
    console.log(id)
  }

  /*
    Create a new subject 
  */
  _newSubject() {
    let authenticationClient = this.context.authenticationClient
    let user = authenticationClient.getUser()
    let resourceClient = this.context.resourceClient
    let items = this.state.items
    let entityData = {
      name: 'New subject',
      synonyms: [],
      description: '',
      entityType: 'subject',
      userId: user.userId,
      updatedBy: user.userId,
      data: {
        name: 'New subject',
        workname: '',
        parent: 'root',
        position: Object.keys(items.getRoots()).length,
        description: ''
      }
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

      items.create({
        id: entity.entityId,
        type: 'subject',
        name: entity.data.name,
        workname: entity.data.workname,
        position: entity.data.position,
        count: 0,
        description: entity.data.description,
        parent: 'root'
      })

      this.extendProps({
        items: items
      })
    })
  }

  /*
    Loads entities
  */
  _loadData() {
    let resourceClient = this.context.resourceClient
    let mainConfigurator = this.context.configurator
    let configurator = mainConfigurator.getConfigurator('archivist-subjects')
    let filters = this.state.filters
    let perPage = this.state.perPage
    let order = this.state.order
    let direction = this.state.direction
    let pagination = this.state.pagination
    let options = {
      mode: 'full',
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

      let importer = configurator.createImporter('subjects')
      let subjects = importer.importDocument(res.records)

      this.extendState({
        items: subjects
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

SubjectsPage.pageName = 'subjects'

export default SubjectsPage
