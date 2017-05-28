import {
  Component, Configurator, EditorSession, EmphasisPackage, StrongPackage,
  LinkPackage, ListPackage, TablePackage, HeadingPackage
} from 'substance'
import RichTextAreaEditor from './RichTextAreaEditor'
import RichTextAreaPackage from './RichTextAreaPackage'
import XrefPackage from '../xref/XrefPackage'
import MinimalSwitchTextTypePackage from '../minimal-switch-text-type/MinimalSwitchTextTypePackage'

// Packages configuration
const PACKAGES = {
  'strong': StrongPackage,
  'emphasis': EmphasisPackage,
  'link': LinkPackage,
  'list': ListPackage,
  'table': TablePackage,
  'xref': XrefPackage,
  'heading': HeadingPackage,
}

const DEFAULT_PACKAGES = ['heading', 'strong', 'emphasis', 'link', 'list', 'table']

class RichTextArea extends Component {
  constructor(...args) {
    super(...args)
    this.cfg = new Configurator().import(RichTextAreaPackage)
    let enabledPackages = this.props.config.enabledPackages || DEFAULT_PACKAGES
    let defaultOptions = {
      disableCollapsedCursor: true,
      toolGroup: 'annotations'
    }
    enabledPackages.forEach((pkg) => {
      this.cfg.import(PACKAGES[pkg], defaultOptions)
    })
    // NOTE: We enable MinimalSwitchTextTypePackage as the last package
    // as it overwrites some labels for heading / paragraphs.
    if (enabledPackages.indexOf('heading') >= 0) {
      this.cfg.import(MinimalSwitchTextTypePackage)
    }
    this._initDoc(this.props)
  }

  didMount() {
    this.registerHandlers()
  }

  didUpdate() {
    this.registerHandlers()
  }

  hideOverlays() {
    this.refs.editor.hideOverlays()
  }

  registerHandlers() {
    this.editorSession.onRender('selection', this._onSelectionChanged, this)
    this.editorSession.onRender('document', this._onDocumentChanged, this)
  }

  unregisterHandlers() {
    this.editorSession.off(this)
  }

  dispose() {
    this.unregisterHandlers()
  }

  /*
    Blurring this editor means setting the selection to null.
    This triggers recomputation of the command states and makes overlays
    disappear
  */
  blur() {
    this.editorSession.setSelection(null)
  }

  _onSelectionPositioned(hints) {
    hints.editorId = this.props.editorId
    this.emit('selection:positioned', hints)
  }

  getChildContext() {
    return {
      editorId: this.props.editorId,
      scrollPane: this.props.scrollPane
    }
  }

  willReceiveProps(props) {
    this.dispose()
    this.empty()
    this._initDoc(props)
  }

  _initDoc(props) {
    this.importer = this.cfg.createImporter('html')
    this.doc = this.importer.importDocument(props.html)

    // Deregister handlers
    this.editorSession = new EditorSession(this.doc, {
      id: this.props.editorId,
      configurator: this.cfg
    })
  }

  _onSelectionChanged() {
    let selectionState = this.editorSession.getSelectionState()
    let activeAnnotation = selectionState.getAnnotationsForType('xref')[0]
    this.emit('selection:changed', {
      activeAnnotation,
      editorId: this.props.editorId
    })
  }

  _onDocumentChanged() {
    this.emit('document:changed', {
      editorId: this.props.editorId
    })
  }

  render($$) {
    let el = $$('div').addClass('sc-rich-text-area')
    el.append(
      $$(RichTextAreaEditor, {
        editorSession: this.editorSession,
        editorId: this.props.editorId
      }).ref('editor')
    )
    return el
  }

  getHTML() {
    let htmlExporter = this.cfg.createExporter('html')
    // Given that exportDocument returns an HTML string
    return htmlExporter.exportDocument(this.doc)
  }
}

export default RichTextArea
