import { ContainerEditor, Highlights, Layout, ProseEditor, SplitPane, Toolbar } from 'substance'
import { forEach } from 'lodash-es'
import PublisherContext from './PublisherContext'

class Publisher extends ProseEditor {
  constructor(...args) {
    super(...args)

    let doc = this.editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)

    this.handleActions({
      'toggleBracket': this._toggleBracket
    })
  }

  didMount() {
    super.didMount()
    let editorSession = this.getEditorSession()
    editorSession.onUpdate(this._onSessionUpdate, this)
    editorSession.on('createEntityReference', this._createEntityReference, this)
  }

  dispose() {
    super.dispose()
    this.getEditorSession().off(this)
  }

  render($$) {
    let el = $$('div').addClass('sc-publisher')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '450px'}).append(
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
      }).ref('contextPanel')
    )
  }

  _renderMainSection($$) {
    let mainSection = $$('div').addClass('se-main-section')
    let splitPane = $$(SplitPane, {splitType: 'horizontal'}).append(
      this._renderToolbar($$),
      this._renderContentPanel($$)
    )
    mainSection.append(splitPane)
    return mainSection
  }

  _renderToolbar($$) {
    let commandStates = this.commandManager.getCommandStates()
    return $$('div').addClass('se-toolbar-wrapper').append(
      $$(Toolbar, {
        toolGroups: ['text', 'document', 'annotations', 'references', 'default'],
        commandStates: commandStates
      }).ref('toolbar')
    )
  }

  _renderContentPanel($$) {
    const doc = this.props.editorSession.getDocument()
    const configurator = this.props.configurator

    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let ContextMenu = this.componentRegistry.get('context-menu')
    let Dropzones = this.componentRegistry.get('dropzones')
    let Brackets = this.componentRegistry.get('brackets')

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
      $$(Brackets, {editor: true}).ref('brackets'),
      $$(ContainerEditor, {
        disabled: this.props.disabled,
        editorSession: this.editorSession,
        node: doc.get('body'),
        commands: configurator.getSurfaceCommandNames(),
        textTypes: configurator.getTextTypes()
      }).ref('body'),
      $$(Overlay),
      $$(ContextMenu),
      $$(Dropzones)
    )

    contentPanel.append(layout)
    return contentPanel
  }

  _onSessionUpdate(editorSession) {
    if (!editorSession.hasChanged('document') && !editorSession.hasChanged('selection')) return

    let change = editorSession.getChange()
    if(change) {
      let changeInfo = editorSession.getChangeInfo()
      // Fetch resource after remote update
      if(changeInfo.remote) {
        Object.keys(change.created).forEach(id => {
          let node = change.created[id]
          let reference = node.reference

          let resources = editorSession.resources
          let entity = find(resources, item => { return item.entityId === reference })
          if(!entity) {
            let resourceClient = this.context.resourceClient
            resourceClient.getEntity(reference, (err, entity) => {
              if (err) {
                console.error(err)
              } else {
                resources.push(entity)
              }
            })
          }
        })
      }
    }

    let doc = editorSession.getDocument()
    let contextPanel = this.refs.contextPanel

    //let entityIndex = doc.getIndex('entities')
    let schema = doc.getSchema()
    let nodes = schema.nodeRegistry.entries
    let highlights = {}
    forEach(nodes, node => {
      if(node.prototype.isResourceReference) {
        highlights[node.type] = []
      }
    })

    let overlapsAnno = false

    let selectionState = editorSession.getSelectionState()
    forEach(highlights, (h, annoType) => {
      let annos = selectionState.getAnnotationsForType(annoType)
      // This will work if inline annotations can't overlap each other
      // we should check for one node
      if(annos.length === 1) {
        let node = annos[0]
        highlights[annoType] = [node.id]
        if(node.reference) {
          contextPanel.openResource(node)
          overlapsAnno = true
        }
      }

      if(!overlapsAnno) {
        contextPanel.openDefaultTab()
      }
      // highlights[annoType] = annos.map(a => {return a.reference})
      // if(highlights[annoType].length === 1) {
      //   let refId = highlights[annoType][0]
      //   let refs = entityIndex.get(refId)
      //   highlights[annoType] = map(refs, a => {return a.id})
      //   contextPanel.openResource(annos[0])
      // }
    })

    this.contentHighlights.set(highlights)
  }

  _toggleBracket(node, active) {
    let contextPanel = this.refs.contextPanel
    contextPanel.toggleBracket(node, active)

    let highlights = {}
    let highlighted = active ? [active] : []
    highlights[node.type] = highlighted

    this.contentHighlights.set(highlights)
  }

  _createEntityReference() {
    let contextPanel = this.refs.contextPanel
    contextPanel.editResource()
  }

}

export default Publisher
