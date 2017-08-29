import { Component, CollabSession, JSONConverter, CollabClient, WebSocketConnection } from 'substance'

// Sample document for debugging
// import SampleDoc from '../../data/sample_doc'

let converter = new JSONConverter()

/*
  Used as a scaffold for PublisherLayout and ReaderLayout components

  Mainly responsible for managing life cycle and data loading
*/
class Loader extends Component {
  constructor(...args) {
    super(...args)

    let config = this.context.config

    this.conn = new WebSocketConnection({
      wsUrl: config.wsUrl || 'ws://'+config.host+':'+config.port
    })

    this.collabClient = new CollabClient({
      connection: this.conn,
      enhanceMessage: function(message) {
        var userSession = this.props.userSession
        if (userSession) {
          message.sessionToken = userSession.sessionToken
        }
        return message
      }.bind(this)
    })

    this.collabClient.on('disconnected', this._onCollabClientDisconnected, this)
    this.collabClient.on('connected', this._onCollabClientConnected, this)
    this.collabClient.on('message', this._onMessage, this)
  }

  getInitialState() {
    return {
      session: null, // CollabSession will be stored here, if null indicates we are in loading state
      error: null, // used to display error messages e.g. loading of document failed
      notification: null //used to display status messages in topbar
    }
  }

  getDocumentId() {
    return this.props.documentId
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
  }

  dispose() {
    if (this.state.session) {
      this.state.session.off(this)
      this.state.session.dispose()
    }
    this.collabClient.off(this)
    this.collabClient.dispose()
  }

  _onMessage(msg) {
    if(msg.type === 'resourceUpdate') {
      let resourceId = msg.resourceId
      let mode = msg.mode
      let session = this.state.session
      if(session) {
        if(mode === 'add') {
          session.emit('resource:add', resourceId)
        } else if (mode === 'remove') {
          session.emit('resource:delete', resourceId)
        }
      }
    }
  }

  _onError(err) {
    this.extendState({
      error: {
        type: 'error',
        message: this.getLabel(err.name)
      }
    })
  }

  // Some hooks
  _onCollabClientDisconnected() {
  }

  _onCollabClientConnected() {
  }

  _onCollabSessionError(/*err*/) {
  }

  _onCollabSessionSync() {
  }

  /*
    Loads a document and initializes a CollabSession
  */
  _loadDocument(documentId) {
    let collabClient = this.collabClient
    let configurator = this.props.configurator
    let documentClient = this.context.documentClient

    documentClient.getDocument(documentId, function(err, docRecord) {
      if (err) {
        this._onError(err)
        return
      }
      //let docRecord = SampleDoc
      let document = configurator.createDocument()
      let doc = converter.importDocument(document, docRecord.data)

      // For debugging
      window.doc = doc

      let session = new CollabSession(doc, {
        configurator: configurator,
        documentId: documentId,
        version: docRecord.version,
        collabClient: collabClient
      })

      // let session = new DocumentSession(doc, {
      //   documentId: documentId,
      //   version: docRecord.version
      // })

      if(docRecord.version === 0) {
        let seed = configurator.getSeed()
        session.transaction(seed)
      }

      // Listen for errors and sync start events for error reporting
      session.on('error', this._onCollabSessionError, this)
      session.on('sync', this._onCollabSessionSync, this)

      this.setState({
        session: session
      })
    }.bind(this))
  }
}

export default Loader
