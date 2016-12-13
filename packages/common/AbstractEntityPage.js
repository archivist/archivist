import { Component, FontAwesomeIcon as Icon, Grid, Input, Layout, SubstanceError as Err } from 'substance'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'

import moment from 'moment'

// Sample data for debugging
// import DataSample from '../../data/docs'

class AbstractEntityPage extends Component {

  getInitialState() {
    return {
      edit: false,
      active: {},
      filters: {},
      search: null,
      dialog: false,
      perPage: 30,
      page: 1,
      order: 'created',
      direction: 'desc',
      items: []
    }
  }

  didMount() {
    this._loadData()
  }

  render($$) {
    let items = this.state.items
    let el = $$('div').addClass('sc-entity-page')

    let header = this.renderHeader($$)
    el.append(header)

    let toolbox = this.renderToolbox($$)
    el.append(toolbox)

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
      searchInput.on('search', this.searchData)
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
    var componentRegistry = this.context.componentRegistry;
    var StatusBar = componentRegistry.get('status-bar');

    return $$(StatusBar);
  }

  renderEmpty($$) {
    var layout = $$(Layout, {
      width: 'medium',
      textAlign: 'center'
    });

    if(this.state.total === 0) {
      layout.append(
        $$('h1').html(
          'No results'
        ),
        $$('p').html('Sorry, no entities matches your query')
      );
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

  renderEntityIcon($$) {
    return $$(Icon, {icon: 'fa-users'})
  }

  renderFull($$) {
    let urlHelper = this.context.urlHelper
    let items = this.state.items
    let total = this.state.total
    let page = this.state.page
    let perPage = this.state.perPage
    //let Pager = this.getComponent('pager')
    let grid = $$(Grid)

    if (items) {
      items.forEach(function(item, index) {
        let url = urlHelper.openEntity(item.entityId)
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
      }.bind(this))
    }
    return grid
  }

  /*
    Search entities
  */
  searchData() {
    let searchValue = this.refs['searchInput'].val()

    if(isEmpty(searchValue)) {
      return this._loadData()
    }

    let language = 'russian'
    let filters = this.state.filters
    let perPage = this.state.perPage
    let page = this.state.page
    let order = this.state.order
    let direction = this.state.direction
    let options = {
      limit: perPage, 
      offset: perPage * (page - 1),
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

      this.extendState({
        items: res.records,
        total: parseInt(res.total, 10),
        details: details
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
    let page = this.state.page
    let order = this.state.order
    let direction = this.state.direction
    let options = {
      limit: perPage, 
      offset: perPage * (page - 1),
      order: order + ' ' + direction
    }

    resourceClient.listEntities(filters, options, function(err, res) {
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

      this.extendState({
        items: res.records,
        total: parseInt(res.total, 10)
      })
    }.bind(this))
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
      this.searchData()
      return false;
    }
  }

  isSearchEventSupported() {
    let element = document.createElement('input')
    let eventName = 'onsearch'
    let isSupported = (eventName in element)
    
    return isSupported
  }
}

export default AbstractEntityPage
