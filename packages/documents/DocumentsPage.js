import { Button, Component, FontAwesomeIcon as Icon, Grid, Input, Layout, SplitPane, SubstanceError as Err, uuid } from 'substance'
import { concat, each, findIndex, isEmpty } from 'lodash-es'
import moment from 'moment'

// Sample data for debugging
// import DataSample from '../../data/docs'

class DocumentsPage extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadMore': this._loadMore,
      'newDocument': this._createDocument
    })
  }

  didMount() {
    this._loadData()
  }

  didUpdate(oldProps, oldState) {
    if(oldState.search !== this.state.search) {
      this.searchData()
    }
  }

  getInitialState() {
    return {
      filters: {},
      search: '',
      perPage: 30,
      order: '"updatedAt"',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }

  // willReceiveProps() {
  //   this._loadData()
  // }

  render($$) {
    let documentItems = this.state.items
    let el = $$('div').addClass('sc-documents')
    let main = $$('div').addClass('se-entity-layout')

    let header = this.renderHeader($$)

    let toolbox = this.renderToolbox($$)
    main.append(toolbox)

    if (documentItems) {
      if (documentItems.length > 0) {
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
        'newDocument': '+ New Document'
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
    let total = this.state.total
    let Pager = this.getComponent('pager')
    let grid = $$(Grid)

    if (items) {
      items.forEach(function(item, index) {
        let url = urlHelper.openDocument(item.documentId)
        let documentIcon = $$(Icon, {icon: 'fa-file-text-o'})
        let title = $$('a').attr({href: url}).append(item.title)
        let updatedAt = ['Updated', moment(item.updatedAt).fromNow(), 'by', item.updatedBy].join(' ')
        let className = item.summary ? 'se-expanded' : ''

        let additionalActions = [
          {label: 'Delete', action: this._removeItem.bind(this, item.entityId)},
        ]

        let row = $$(Grid.Row).addClass('se-document-meta ' + className).ref(item.documentId).append(
            $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(documentIcon),
            $$(Grid.Cell, {columns: 5}).addClass('se-title').append(title),
            $$(Grid.Cell, {columns: 3}).append(updatedAt),
            $$(Grid.Cell, {columns: 2}).append(item.count ? item.count + ' fragments' : ''),
            $$(Grid.Cell, {columns: 1}).addClass('se-additional').append(
              this.renderAdditionalMenu($$, additionalActions)
            ).on('click', function(e) {
              e.stopPropagation()
            })
        ).on('click', this._loadFragments.bind(this, item.documentId, index))

        if(item.summary) {
          row.append(
            $$(Grid.Row).addClass('se-document-summary').append(
              $$(Grid.Cell, {columns: 12}).addClass('se-summary').append(item.summary)
            )
          )
        }

        grid.append(row)

        if(this.state.details === index && item.fragments) {
          item.fragments.forEach(function(fragment) {
            let fragmentIcon = $$(Icon, {icon: 'fa-comments-o'})
            grid.append(
              $$(Grid.Row).addClass('se-document-fragment').append(
                $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(fragmentIcon),
                $$(Grid.Cell, {columns: 11}).addClass('se-fragment').append($$('p').setInnerHTML(fragment.content))
              )
            )
          })
        }
      }.bind(this))
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

  _createDocument() {
    let authClient = this.context.authenticationClient
    let documentClient = this.context.documentClient
    let user = authClient.getUser()
    
    documentClient.createDocument({
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      info: {
        title: 'Untitled',
        userId: user.userId
      }
    }, (err, result) => {
      this.send('navigate', {
        page: 'documents',
        documentId: result.documentId
      })
    })
  }

  _removeItem(id) {
    console.log(id)
  }

  /*
    Search documents
  */
  searchData() {
    let searchValue = this.state.search

    if(isEmpty(searchValue)) {
      return this._loadData()
    }

    let language = 'russian'
    let filters = {}
    let perPage = this.state.perPage
    let pagination = this.state.pagination
    let options = {
      limit: perPage, 
      offset: pagination ? this.state.items.length : 0
    }
    let items = []
    let documentClient = this.context.documentClient

    documentClient.searchDocuments(searchValue, language, filters, options, function(err, docs) {
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

      let details = findIndex(docs.records, function(record) {
        return record.fragments
      })

      if(pagination) {
        items = concat(this.state.items, docs.records)
      } else {
        items = docs.records
      }

      this.extendState({
        items: items,
        total: parseInt(docs.total, 10),
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
    Loads documents
  */
  _loadData() {
    let pagination = this.state.pagination
    let perPage = this.state.perPage
    let options = {
      limit: perPage, 
      offset: pagination ? this.state.items.length : 0,
      order: this.state.order + ' ' + this.state.direction
    }
    let items = []

    let documentClient = this.context.documentClient

    documentClient.listDocuments({}, options, function(err, docs) {
      if (err) {
        this.setState({
          error: new Err('DocumentsPage.LoadingError', {
            message: 'Documents could not be loaded.',
            cause: err
          })
        })
        console.error('ERROR', err)
        return
      }

      if(pagination) {
        items = concat(this.state.items, docs.records)
      } else {
        items = docs.records
      }

      this.extendState({
        items: items,
        total: parseInt(docs.total, 10)
      })
    }.bind(this))
  }

  _loadFragments(documentId, index) {
    let searchValue = this.state.search

    if(isEmpty(searchValue)) {
      return
    }

    let language = 'russian'
    let filters = {}
    let options = {}
    let documentClient = this.context.documentClient
    let items = this.state.items

    if(!items[index].fragments) {
      documentClient.searchFragments(documentId, searchValue, language, filters, options, function(err, fragments) {
        if (err) {
          this.setState({
            error: new Err('DocumentsPage.FragmentsSearchError', {
              message: 'Search results could not be loaded.',
              cause: err
            })
          })
          console.error('ERROR', err)
          return
        }

        items[index].fragments = fragments

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

export default DocumentsPage
