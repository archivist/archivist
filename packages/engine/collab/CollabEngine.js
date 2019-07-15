import { CollabEngine } from 'substance'

class ArchivistCollabEngine extends CollabEngine {
  /*
    Client starts a sync

    @param args.documentId
    @param args.version The client's document version (0 if client starts with an empty doc)
    @param args.change pending client change

    Note: a client can reconnect having a pending change
    which is similar to the commit case
  */
  sync({documentId, version, change, collaboratorId, collaboratorInfo}, cb) {
    this._sync({documentId, version, change}, function(err, result) {
      if (err) return cb(err)
      // Registers the collaborator If not already registered for that document
      this._register(collaboratorId, documentId, collaboratorInfo)
      cb(null, result)
    }.bind(this))
  }
}

export default ArchivistCollabEngine