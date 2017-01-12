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
      'showReferences': this._showReferences,
      'showTopics': this._showTopics
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
      $$(Brackets).ref('brackets'),
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

  highlightReferences(entities, containerAnnos) {
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let schema = doc.getSchema()
    let nodes = schema.nodeRegistry.entries
    let highlights = {}
    forEach(nodes, node => {
      if(node.schema.hasOwnProperty('reference')) {
        highlights[node.type] = []
      }
    })
    forEach(entities, entityId => {
      if(containerAnnos) {
        let refs = entityIndex.get(entityId)
        forEach(refs, ref => {
          let entityType = ref.type
          highlights[entityType] = highlights[entityType].concat(doc.getPathRange(ref.startPath[0], ref.endPath[0]))
        })
      } else {
        let refs = entityIndex.get(entityId)
        let keys = Object.keys(refs)
        if(keys.length > 0) {
          let entityType = refs[keys[0]].type
          let annos = map(refs, n => {return n.id})
          highlights[entityType] = highlights[entityType].concat(annos)
        }
      }
    })

    this.contentHighlights.set(highlights)
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
    this.highlightReferences([entityId])

    if(!silent) {
      let urlHelper = this.context.urlHelper
      urlHelper.focusResource(entityId)
    }
  }

  _showTopics(topics) {
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let paragraphs = []
    forEach(topics, topic => {
      let refs = entityIndex.get(topic)
      let paras = map(refs, n => {return n.startPath[0]})
      paragraphs = paragraphs.concat(paras)
    })
    let firstPara = doc.getFirst(paragraphs)
    this.refs.contentPanel.scrollTo(firstPara)

    setTimeout(function(){
      this.highlightReferences(topics, true)
      this.refs.brackets.highlight(topics)
    }.bind(this), 10)
  }

}

export default Reader
