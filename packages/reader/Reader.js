import { ContainerEditor, Highlights, Layout, ProseEditor, SplitPane } from 'substance'
import ReaderContext from './ReaderContext'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'

class Reader extends ProseEditor {
  constructor(...args) {
    super(...args)

    let doc = this.editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)

    this.handleActions({
      'showReferences': this._showReferences
    })
  }

  didMount() {
    let parent = this.getParent()
    let entityId = parent.props.entityId
    if(entityId) {
      this._showReferences(entityId, true)
    }
  }

  dispose() {
    this.editorSession.off(this)
    this._dispose()
  }

  render($$) {
    let el = $$('div').addClass('sc-reader')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '35%'}).append(
        this._renderMainSection($$),
        this._renderContextSection($$)
      )
    )
    return el
  }

  _renderContextSection($$) {
    let parent = this.getParent()
    return $$('div').addClass('se-context-section').append(
      $$(ReaderContext, parent.props).ref('contextPanel')
    )
  }

  _renderMainSection($$) {
    let mainSection = $$('div').addClass('se-main-section')
    mainSection.append(this._renderContentPanel($$))
    return mainSection
  }

  _renderContentPanel($$) {
    const doc = this.props.editorSession.getDocument()
    const configurator = this.props.configurator

    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let Brackets = this.componentRegistry.get('brackets')

    let contentPanel = $$(ScrollPane, {
      scrollbarType: 'substance',
      scrollbarPosition: 'left',
      highlights: this.contentHighlights
    }).ref('contentPanel')

    let layout = $$(Layout, {
      width: 'large'
    })
    
    layout.append(
      $$(Brackets, {}),
      $$(ContainerEditor, {
        disabled: 'true',
        editorSession: this.editorSession,
        node: doc.get('body'),
        commands: configurator.getSurfaceCommandNames(),
        textTypes: configurator.getTextTypes()
      }).ref('body'),
      $$(Overlay)
    )

    contentPanel.append(layout)
    return contentPanel
  }

  highlightReference(entityId) {
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

    let refs = entityIndex.get(entityId)
    let keys = Object.keys(refs)
    if(keys.length > 0) {
      let entityType = refs[keys[0]].type
      highlights[entityType] = map(refs, n => {return n.id})
      this.contentHighlights.set(highlights)
    }
  }

  _showReferences(entityId, silent) {
    let container = this.refs.body.getContainer()
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let refs = entityIndex.get(entityId)
    let ordered = orderBy(refs, ref => {
      let p = ref.path[0]
      return container.getPosition(p)
    })

    this.refs.contentPanel.scrollTo(ordered[0].id)
    this.highlightReference(entityId)

    if(!silent) {
      let urlHelper = this.context.urlHelper
      urlHelper.focusResource(entityId)
    }

  }

}

export default Reader
