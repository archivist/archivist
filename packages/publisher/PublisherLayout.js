import { JSONConverter, Layout, series, SplitPane, substanceGlobals } from 'substance'
import PublisherSession from './PublisherSession'
import Loader from '../common/Loader'
import Publisher from './Publisher'

let converter = new JSONConverter()

class PublisherLayout extends Loader {

  dispose() {
    super.dispose.call(this)
    document.body.classList.remove('sm-fixed-layout')
  }

  _updateLayout() {
    if (this.props.mobile) {
      document.body.classList.remove('sm-fixed-layout')
    } else {
      document.body.classList.add('sm-fixed-layout')
    }
  }

  render($$) {
    let Header = this._getHeaderClass()
    let Spinner = this.getComponent('spinner')
    let Notification = this.getComponent('notification')

    let notification = this.state.notification
    let el = $$('div').addClass('sc-edit-document')
    let main = $$(Layout, {
      width: 'medium',
      textAlign: 'center'
    }).append($$(Spinner, {message: 'spinner-loading'}))
    let header

    this._updateLayout()

    // Configure header
    // --------------

    header = $$(Header, {
      page: 'archive',
      mobile: this.props.mobile
    })

    // Notification overrules collaborators
    if (notification) {
      el.append(
        $$(Notification, notification)
      )
    }
    // else if (this.state.session) {
    //   header.outlet('content').append(
    //     $$(Collaborators, {
    //       session: this.state.session
    //     })
    //   )
    // }

    // Main content
    // --------------

    // Display top-level errors. E.g. when a doc could not be loaded
    // we will display the notification on top level
    if (this.state.error) {
      console.error(this.state.error.message)
      main = $$('div').append(
        $$(Notification, {
          type: 'error',
          message: this.state.error.message
        })
      )
    } else if (this.state.session) {
      let fileClient = this.context.fileClient
      let EditorClass = this._getEditorClass()
      main = $$(EditorClass, {
        configurator: this.props.configurator,
        editorSession: this.state.session,
        onUploadFile: fileClient.uploadFile.bind(fileClient)
      }).ref('publisher')
    }

    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeA: '40px'}).append(
        header,
        main
      ).ref('splitPane')
    )

    return el
  }

  _getEditorClass() {
    return Publisher
  }

  _getHeaderClass() {
    return this.getComponent('header')
  }

  _onCollabClientDisconnected() {
    this.extendState({
      notification: {
        type: 'error',
        message: 'Connection lost! After reconnecting, your changes will be saved.'
      }
    })
  }

  _onCollabClientConnected() {
    this.extendState({
      notification: null
    })
  }

  /*
    Extract error message for error object. Also consider first cause.
  */
  _onCollabSessionError(err) {
    var message = [
      this.getLabel(err.name)
    ]
    if (err.cause) {
      message.push(this.getLabel(err.cause.name));
    }
    this.extendState({
      notification: {
        type: 'error',
        message: message.join(' ')
      }
    })
  }

  _onCollabSessionSync() {
    if (this.state.notification) {
      // Unset notification (error message)
      this.extendState({
        notification: null
      })
    }
  }

  /*
    Loads a document and initializes a Document Session
  */
  _loadDocument(documentId) {
    let configurator = this.props.configurator
    let collabClient = this.collabClient
    let documentClient = this.context.documentClient

    documentClient.getDocument(documentId, (err, docRecord) => {
      if (err) {
        this._onError(err)
        return
      }
      //let docRecord = SampleDoc
      let document = configurator.createDocument()
      let doc = converter.importDocument(document, docRecord.data)

      let session = new PublisherSession(doc, {
        configurator: configurator,
        documentId: documentId,
        version: docRecord.version,
        collabClient: collabClient
      })

      if (substanceGlobals.DEBUG_RENDERING) {
        window.doc = doc
        window.session = session
      }

      series([
        this._loadResources(documentId, session),
        this._loadCollaborators(documentId, session)
      ], () => {
        this.setState({
          session: session
        })
      })
    })
  }

  _loadResources(documentId, session) {
    return function(cb) {
      this._loadDocumentResources(documentId, (err, resources) => {
        session.resources = resources
        cb()
      })
    }.bind(this)
  }

  _loadCollaborators(documentId, session) {
    let authClient = this.context.authenticationClient
    let user = authClient.getUser()
    return function(cb) {
      this._loadDocumentCollaborators(documentId, (err, collaborators) => {
        let collaboratorsIndex = {}
        collaborators.forEach(collab => {
          collaboratorsIndex[collab.userId] = collab
        })

        if(!collaboratorsIndex[user.userId]) {
          collaboratorsIndex[user.userId] = {
            userId: user.userId,
            name: user.name
          }
        }

        session.collaborators = collaboratorsIndex
        cb()
      })
    }.bind(this)
  }

  /*
    Loads document resources
  */
  _loadDocumentResources(documentId, cb) {
    let resourceClient = this.context.resourceClient
    resourceClient.getDocumentResources(documentId, cb)
  }

  /*
    Loads document collaborators
  */
  _loadDocumentCollaborators(documentId, cb) {
    let resourceClient = this.context.resourceClient
    resourceClient.getDocumentCollaborators(documentId, cb)
  }
}

export default PublisherLayout
