import { Component, EditorSession, JSONConverter, SplitPane } from 'substance'
import Reader from './Reader'

let converter = new JSONConverter()

class ReaderLayout extends Component {

  getInitialState() {
    return {
      session: null, // CollabSession will be stored here, if null indicates we are in loading state
      error: null, // used to display error messages e.g. loading of document failed
      notification: null //used to display status messages in topbar
    }
  }

  dispose() {
    if(this.state.session) {
      this.state.session.off(this)
      this.state.session.dispose()
    }
    document.body.classList.remove('sm-fixed-layout')
  }

  didMount() {
    // load the document after mounting
    this._loadDocument(this.getDocumentId())
  }

  willReceiveProps(newProps) {
    if (newProps.documentId !== this.props.documentId) {
      this.dispose()
      // TODO: Use setState instead?
      this.state = this.getInitialState()
      this._loadDocument(newProps.documentId)
    }

    if (newProps.entityId !== this.props.entityId) {
      setTimeout(function(){
        this.refs.reader.highlightReference(newProps.entityId)
      }.bind(this), 10)
    }
  }

  _updateLayout() {
    if (this.props.mobile) {
      document.body.classList.remove('sm-fixed-layout')
    } else {
      document.body.classList.add('sm-fixed-layout')
    }
  }

  render($$) {
    let el = $$('div').addClass('sc-read-document')
    let main = $$('div')

    this._updateLayout()

    if (this.state.error) {
      main = $$('div').append(
        $$(Notification, {
          type: 'error',
          message: this.state.error.message
        })
      )
    } else if (this.state.session) {
      main = $$(Reader, {
        configurator: this.props.configurator,
        editorSession: this.state.session
      }).ref('reader')
    }

    el.append(
      main
      // $$(SplitPane, {splitType: 'horizontal'}).append(
      //   main
      // ).ref('splitPane')
    )

    return el
  }

  getDocumentId() {
    return this.props.documentId
  }

  /*
    Loads a document and initializes a Document Session
  */
  _loadDocument(documentId) {
    let configurator = this.props.configurator
    let documentClient = this.context.documentClient

    documentClient.getDocument(documentId, (err, docRecord) => {
      if (err) {
        this._onError(err)
        return
      }
      //let docRecord = SampleDoc
      let document = configurator.createArticle()
      let doc = converter.importDocument(document, docRecord.data)

      let session = new EditorSession(doc, {
        configurator: configurator
      })

      // For debugging
      window.doc = doc
      window.session = session

      // load document resources
      this._loadDocumentResources(documentId, (err, resources) => {
        if (err) {
          this._onError(err)
          return
        }

        session.resources = resources

        this.setState({
          session: session
        })
      })
    })
  }

  /*
    Loads document resources
  */
  _loadDocumentResources(documentId, cb) {
    let resourceClient = this.context.resourceClient
    resourceClient.getDocumentResources(documentId, cb)
  }

  _onError(err) {
    console.error(err)
  }
}

export default ReaderLayout
