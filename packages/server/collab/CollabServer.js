let CollabServer = require('substance').CollabServer
let DocumentChange = require('substance').DocumentChange
let Err = require('substance').SubstanceError
let forEach = require('lodash/forEach')

/*
  DocumentServer module. Can be bound to an express instance
*/
class ArchivistCollabServer extends CollabServer {
  constructor(config) {
    super(config)
    this.authEngine = config.authEngine
    this.documentStore = config.documentStore
  }

  /*
    Checks for authentication based on message.sessionToken
  */
  authenticate(req, res) {
    let sessionToken = req.message.sessionToken
    this.authEngine.getSession(sessionToken).then(function(session) {
      req.setAuthenticated(session)
      this.next(req, res)
    }.bind(this)).catch(function(err) {
      console.error(err)
      // Send the response with some delay
      this._error(req, res, new Err('AuthenticationError', {cause: err}))
      return
    }.bind(this))
  }

  /*
    Will store the userId along with each change. We also want to build
    a documentInfo object to update the document record with some data
  */
  enhanceRequest(req, res) {
    let message = req.message
    if (message.type === 'sync') {
      // We fetch the document record to get the old title
      this.documentStore.getDocument(message.documentId, function(err, docRecord) {
        let updatedAt = new Date()
        let title = docRecord.title

        if (message.change) {
          // Update the title if necessary
          let change = DocumentChange.fromJSON(message.change)
          change.ops.forEach(function(op) {
            if(op.path[0] === 'meta' && op.path[1] === 'title') {
              title = op.diff.apply(title)
            }
          })

          message.change.info = {
            userId: req.session.userId,
            updatedAt: updatedAt
          }
        }

        message.collaboratorInfo = {
          name: req.session.user.name
        }

        // commit and connect method take optional documentInfo argument
        message.documentInfo = {
          updatedAt: updatedAt,
          updatedBy: req.session.userId,
          title: title
        }
        req.setEnhanced()
        this.next(req, res)
      }.bind(this))
    } else {
      // Just continue for everything that is not handled
      req.setEnhanced()
      this.next(req, res)
    }
  }

  resourceSync(req, res) {
    let args = req.message
    let documentId = args.documentId
    let collaborators = this.collabEngine.getCollaborators(documentId, args.collaboratorId)
    
    res.send({
      scope: this.scope,
      type: 'resourceSyncDone',
      documentId: documentId
    })

    forEach(collaborators, (collaborator) => {
      this.send(collaborator.collaboratorId, {
        scope: this.scope,
        type: 'resourceUpdate',
        documentId: documentId,
        resourceId: args.resourceId,
        mode: args.mode
      })
    })
    this.next(req, res)
  }

}

export default ArchivistCollabServer
