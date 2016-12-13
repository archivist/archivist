import { ContainerEditor, Highlights, Layout, ProseEditor, SplitPane } from 'substance'
import PublisherContext from './PublisherContext'
import forEach from 'lodash/forEach'
import map from 'lodash/map'

class Publisher extends ProseEditor {
  constructor(...args) {
    super(...args)

    let doc = this.editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)

    this.editorSession.onRender('selection', this._onSelectionChanged, this)
  }

  didMount() {
    this.editorSession.onRender('selection', this._onSelectionChanged, this)
  }

  dispose() {
    this.editorSession.off(this)
    this._dispose()
  }

  render($$) {
    let el = $$('div').addClass('sc-publisher')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '400px'}).append(
        this._renderMainSection($$),
        this._renderContextSection($$)
      )
    )
    return el
  }

  _renderContextSection($$) {
    return $$('div').addClass('se-context-section').append(
      $$(PublisherContext, {
        configurator: this.props.configurator
      })
    )
  }

  _renderMainSection($$) {
    let mainSection = $$('div').addClass('se-main-section')
    let splitPane = $$(SplitPane, {splitType: 'horizontal'}).append(
      // inherited from  ProseEditor
      this._renderToolbar($$),
      this._renderContentPanel($$)
    )
    mainSection.append(splitPane)
    return mainSection
  }

  _renderContentPanel($$) {
    const doc = this.props.editorSession.getDocument()
    const configurator = this.props.configurator

    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let ContextMenu = this.componentRegistry.get('context-menu')
    let DropTeaser = this.componentRegistry.get('drop-teaser')

    let contentPanel = $$(ScrollPane, {
      contextMenu: 'custom',
      scrollbarType: 'substance',
      scrollbarPosition: 'left',
      highlights: this.contentHighlights
    }).ref('contentPanel')

    let layout = $$(Layout, {
      width: 'large'
    })
    
    layout.append(
      $$(ContainerEditor, {
        disabled: this.props.disabled,
        editorSession: this.editorSession,
        node: doc.get('body'),
        commands: configurator.getSurfaceCommandNames(),
        textTypes: configurator.getTextTypes()
      }).ref('body'),
      $$(Overlay),
      $$(ContextMenu),
      $$(DropTeaser)
    )

    contentPanel.append(layout)
    return contentPanel
  }

  _onSelectionChanged() {
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let schema = doc.getSchema()
    let nodes = schema.nodeRegistry.entries
    let highlights = {}
    forEach(nodes, node => {
      if(node.schema.hasOwnProperty('reference') && node.schema.hasOwnProperty('path')) {
        highlights[node.type] = []
      }
    })

    let sel = editorSession.getSelection()
    let selectionState = editorSession.getSelectionState()
    forEach(highlights, (h, annoType) => {
      let annos = selectionState.getAnnotationsForType(annoType)
      highlights[annoType] = annos.map(a => {return a.reference})
      if(highlights[annoType].length === 1) {
        let refId = highlights[annoType][0]
        let refs = entityIndex.get(refId)
        highlights[annoType] = map(refs, a => {return a.id});
      }
    })

    // let xrefs = selectionState.getAnnotationsForType('xref')
    // let highlights = {
    //   'fig': [],
    //   'bibr': []
    // }

    // if (xrefs.length === 1 && xrefs[0].getSelection().equals(sel) ) {
    //   let xref = xrefs[0]
    //   highlights[xref.referenceType] = xref.targets.concat([xref.id])
    // }

    this.contentHighlights.set(highlights)
  }

}

export default Publisher
