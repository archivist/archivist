import { ContainerEditor, Highlights, Layout, ProseEditorPackage, Toolbar, WorkflowPane } from 'substance'
import { find, findIndex, forEach, map, uniq } from 'lodash-es'
import PublisherContext from './PublisherContext'

const { ProseEditor } = ProseEditorPackage

class Publisher extends ProseEditor {
  constructor(...args) {
    super(...args)

    let doc = this.editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)
    this.updatingResources = false

    this.handleActions({
      'showReferences': this._showReferences,
      'toggleBracket': this._toggleBracket,
      'showComment': this._showComment
    })
  }

  didMount() {
    super.didMount()
    let editorSession = this.getEditorSession()
    editorSession.onUpdate(this._onSessionUpdate, this)
    editorSession.on('createInlineEntityReference', this._createEntityReference, this)
    editorSession.on('createComment', this._createComment, this)
    editorSession.on('resource:add', this._addResource, this)
    editorSession.on('resource:delete', this._deleteResource, this)
    editorSession.on('collaborator:add', this._addCollaborator, this)
    let meta = this.doc.get('meta')
    document.title = this.getLabel(meta.title)
  }

  dispose() {
    super.dispose()
    this.getEditorSession().off(this)
  }

  render($$) {
    let SplitPane = this.componentRegistry.get('split-pane')
    let el = $$('div').addClass('sc-publisher')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '30%'}).append(
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
    let configurator = this.getConfigurator()
    let SplitPane = this.componentRegistry.get('split-pane')
    let mainSection = $$('div').addClass('se-main-section')
    let toolbar = this._renderToolbar($$)
    let contentPanel = this._renderContentPanel($$)
    let splitPane = $$(SplitPane, {splitType: 'horizontal'}).append(
      toolbar,
      $$(SplitPane, {splitType: 'horizontal', sizeB: 'inherit'}).append(
        contentPanel,
        $$(WorkflowPane, {
          toolPanel: configurator.getToolPanel('workflow')
        })
      )
    )
    mainSection.append(splitPane)
    return mainSection
  }

  _renderEditor($$) {
    let configurator = this.getConfigurator()
    return $$(ContainerEditor, {
      disabled: this.props.disabled,
      editorSession: this.editorSession,
      node: this.doc.get('body'),
      commands: configurator.getSurfaceCommandNames()
    }).ref('body')
  }

  _renderToolbar($$) {
    let configurator = this.getConfigurator()
    let Collaborators = this.getComponent('collaborators')
    return $$('div').addClass('se-toolbar-wrapper').append(
      $$(Toolbar, {
        toolPanel: configurator.getToolPanel('toolbar')
      }).ref('toolbar'),
      $$(Collaborators)
    )
  }

  _renderContentPanel($$) {
    const configurator = this.props.configurator

    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let ContextMenu = this.componentRegistry.get('context-menu')
    let Dropzones = this.componentRegistry.get('dropzones')
    let Brackets = this.componentRegistry.get('brackets')

    let editor = this._renderEditor($$)

    let contentPanel = $$(ScrollPane, {
      contextMenu: this.props.contextMenu || 'native',
      scrollbarType: 'substance',
      scrollbarPosition: 'left',
      highlights: this.contentHighlights
    }).ref('contentPanel')

    let layout = $$(Layout, {
      width: 'large'
    })

    layout.append(
      $$(Brackets, {editor: true}).ref('brackets'),
      editor,
      $$(Overlay, {
        toolPanel: configurator.getToolPanel('main-overlay'),
        theme: 'dark'
      }),
      $$(ContextMenu),
      $$(Dropzones)
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
          highlights[entityType] = highlights[entityType].concat(ref.id + '-bracket')
          highlights[entityType] = uniq(highlights[entityType])
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

  _showReferences(entityId) {
    let container = this.refs.body.getContainer()
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let refs = entityIndex.get(entityId)
    // We are sorting references by paregraph position
    // if nodes annotations are in same paragraph
    // we will sort them by start offset
    let refIds = Object.keys(refs)
    let ordered = refIds.sort((a,b) => {
      const refAPath = refs[a].getPath()
      const refBPath = refs[b].getPath()

      if (refAPath[0] !== refBPath[0]){
        return (container.getPosition(refAPath[0]) - container.getPosition(refBPath[0]))
      } else {
        const refAOffset = refs[a].start.getOffset()
        const refBOffset = refs[b].start.getOffset()

        return (refAOffset - refBOffset)
      }
    })

    this.refs.contentPanel.scrollTo(`[data-id="${ordered[0]}"]`)
    this.highlightReferences([entityId])
  }

  _showComment(commentId) {
    this.refs.contentPanel.scrollTo(`[data-id="${commentId}"]`)
  }

  _onSessionUpdate(editorSession) {
    if (!editorSession.hasChanged('document') && !editorSession.hasChanged('selection')) return

    let change = editorSession.getChange()
    if(change) {
      let author = change.info.userId
      if(author) this._addCollaborator(author)
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
    })

    this.contentHighlights.set(highlights)
  }

  _addResource(resourceId) {
    let editorSession = this.getEditorSession()
    this._fetchResource(editorSession, resourceId)
  }

  _deleteResource(resourceId) {
    let editorSession = this.getEditorSession()
    let index = findIndex(editorSession.resources, item => { return item.entityId === resourceId })

    editorSession.resources.splice(index, 1)
  }

  _fetchResource(editorSession, reference) {
    if(reference && !this.updatingResources) {
      this.updatingResources = true
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
          this.updatingResources = false
        })
      }
    }
  }

  _addCollaborator(userId) {
    let editorSession = this.getEditorSession()
    let collaborators = editorSession.collaborators
    if(!collaborators[userId]) this._fetchCollaborator(editorSession, userId)
  }

  _fetchCollaborator(editorSession, userId) {
    let resourceClient = this.context.resourceClient
    let collaborators = editorSession.collaborators
    resourceClient.getCollaborator(userId, (err, collaborator) => {
      if (err) {
        console.error(err)
      } else {
        collaborators[userId] = collaborator
      }
    })
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

  _createComment(anno) {
    let contextPanel = this.refs.contextPanel
    contextPanel.createComment(anno)
  }
}

export default Publisher
