import { Component, FontAwesomeIcon as Icon, Grid, Input, Layout, SubstanceError as Err } from 'substance'
import moment from 'moment'

// Sample data for debugging
import DataSample from '../../data/docs'

class DocumentsPage extends Component {

  didMount() {
    this._loadData()
  }

  // willReceiveProps() {
  //   this._loadData()
  // }

  render($$) {
    let documentItems = this.state.items
    let el = $$('div').addClass('sc-documents')

    let header = this.renderHeader($$)
    el.append(header)

    let toolbox = this.renderToolbox($$)
    el.append(toolbox)

    if (!documentItems) {
      return el
    }

    if (documentItems.length > 0) {
      el.append(this.renderFull($$))
    } else {
      el.append(this.renderEmpty($$))
    }
    return el
  }

  renderFilters($$) {
    let filters = []
    let search = $$('div').addClass('se-search').append(
      $$(Icon, {icon: 'fa-search'}),
      $$(Input, {placeholder: 'Search...'})
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
        'newDocument': '+ New Document'
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

    layout.append(
      $$('h1').html(
        'No results'
      ),
      $$('p').html('Sorry, no documents matches your query')
    );

    return layout;
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
      items.forEach(function(item) {
        let url = urlHelper.openDocument(item.documentId)
        let icon = $$(Icon, {icon: 'fa-file-text-o'})
        let title = $$('a').attr({href: url}).append(item.title)
        let updatedAt = ['Updated', moment(item.updatedAt).fromNow(), 'by', item.updatedBy].join(' ')
        let more = $$(Icon, {icon: 'fa-ellipsis-v'})

        grid.append(
          $$(Grid.Row).ref(item.documentId).append(
            $$(Grid.Cell, {columns: 1}).addClass('se-badge').append(icon),
            $$(Grid.Cell, {columns: 6}).addClass('se-title').append(title),
            $$(Grid.Cell, {columns: 4}).append(updatedAt),
            $$(Grid.Cell, {columns: 1}).addClass('se-more').append(more)
          )
        )
      }.bind(this))
    }
    return grid
  }

  /*
    Loads documents
  */
  _loadData() {
    // Sample data for debugging

    // this.extendState({
    //   items: DataSample,
    //   total: DataSample.length
    // });

    let documentClient = this.context.documentClient;

    documentClient.listDocuments(function(err, docs) {
      if (err) {
        this.setState({
          error: new Err('DocumentsPage.LoadingError', {
            message: 'Documents could not be loaded.',
            cause: err
          })
        });
        console.error('ERROR', err);
        return;
      }

      this.extendState({
        items: docs.records,
        total: docs.total
      });
    }.bind(this));
  }
}

export default DocumentsPage
