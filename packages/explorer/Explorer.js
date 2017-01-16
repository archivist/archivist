import { Component, FontAwesomeIcon as Icon, Grid, Layout, SplitPane } from 'substance'
import concat from 'lodash/concat'
import each from 'lodash/each'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'

import moment from 'moment'

// Sample data for debugging
// import DataSample from '../../data/docs'

class Explorer extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'loadFragments': this._loadFragments,
      'loadMore': this._loadMore,
      'search': this._searchData
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
      filters: {"meta->>'state'": "published"},
      search: '',
      perPage: 30,
      order: "meta->>'published_on'",
      direction: 'desc',
      pagination: false,
      items: []
    }
  }

  render($$) {
    let documentItems = this.state.items
    let el = $$('div').addClass('sc-explorer')

    if (!documentItems) {
      return el
    }

    let SearchBar = this.getComponent('searchbar')

    let layout = $$(Layout, {
      width: 'full',
      textAlign: 'left',
      noPadding: true
    }).addClass('se-explorer-layout')

    layout.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        $$(SearchBar, {value: this.state.search}),
        $$(SplitPane, {splitType: 'vertical', sizeB: '30%'}).append(
          this.renderMainSection($$),
          this.renderSidebarSection($$)
        )
      )
    )

    el.append(layout)

    return el
  }

  renderMainSection($$) {
    let documentItems = this.state.items
    if (documentItems.length > 0) {
      return this.renderFull($$)
    } else {
      return this.renderEmpty($$)
    }
  }

  renderSidebarSection($$) {
    let el = $$('div').addClass('se-sidebar')

    return el
  }

  renderEmpty($$) {
    let layout = $$(Layout, {
      width: 'medium',
      textAlign: 'center'
    })

    if(this.state.total === 0) {
      layout.append(
        $$('h1').append(this.getLabel('no-results')),
        $$('p').append(this.getLabel('no-results-info'))
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
      );
    }

    return layout;
  }

  renderFull($$) {
    let items = this.state.items
    let total = this.state.total
    let DocumentItem = this.getComponent('document-item')
    let Pager = this.getComponent('pager')
    let grid = $$(Grid)

    if (items) {
      items.forEach((item, index) => {
        let active = this.state.details === index
        grid.append(
          $$(DocumentItem, {item: item, index: index, active: active}).ref(item.documentId)
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

  /*
    Search documents
  */
  searchData() {
    let searchValue = this.state.search

    if(isEmpty(searchValue)) {
      return this._loadData()
    }

    let language = 'russian'
    let filters = this.state.filters
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
        console.error('Search results could not be loaded', err)
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
    let filters = this.state.filters
    let pagination = this.state.pagination
    let perPage = this.state.perPage
    let options = {
      order: this.state.order + ' ' + this.state.direction,
      limit: perPage, 
      offset: pagination ? this.state.items.length : 0
    }
    let items = []

    let documentClient = this.context.documentClient

    documentClient.listDocuments(filters, options, function(err, docs) {
      if (err) {
        console.error('Documents could not be loaded', err)
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
          console.error('Search results could not be loaded', err)
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

  _searchData(value) {
    this.extendState({
      search: value,
      pagination: false
    })
  }
}

export default Explorer
