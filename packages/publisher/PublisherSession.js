import { CollabSession } from 'substance'
import { difference, filter, map } from 'lodash-es'

class PublisherSession extends CollabSession {
  /*
    Apply a change to the document
  */
  _applyRemoteChange(change) {
    // console.log('CollabSession: applying remote change');
    if (change.ops.length > 0) {
      this._transaction.__applyChange__(change)
      this.getDocument()._apply(change)
      this._setDirty('document')
      // Only undo+redo history is updated according to the new change
      this._transformLocalChangeHistory(change)
      this._setSelection(this._transformSelection(change))
      this._change = change
      this._info = { remote: true }
      this.startFlow()
    }
  }

  /*
    Apply remote update

    We receive an update from the server. We only apply the remote change if
    there's no pending commit. applyRemoteUpdate is also called for selection
    updates.

    If we are currently in the middle of a sync or have local changes we just
    ignore the update. We will receive all server updates on the next syncDone.
  */
  update(args) {
    // console.log('CollabSession.update(): received remote update', args);
    let serverChange = args.change
    let serverVersion = args.version
    let collaborators = args.collaborators

    if (!this._nextChange && !this._pendingSync) {
      if (serverChange) {
        serverChange = this.deserializeChange(serverChange)
        this._applyRemoteChange(serverChange)
      }
      if (serverVersion) {
        this.version = serverVersion
      }

      let collaboratorsChanged = this._updateCollaborators(collaborators)
      if (collaboratorsChanged) {
        this.emit('collaborators:changed')
      }

      this.startFlow()
    } else {
      console.info('skipped remote update. Pending sync or local changes.');
    }
  }

  /*
    Sync has completed

    We apply server changes that happened in the meanwhile and we update
    the collaborators (=selections etc.)
  */
  syncDone(args) {
    // console.log('syncDone', args)
    let serverChange = args.serverChange
    let serverVersion = args.version
    let collaborators = args.collaborators

    if (serverChange) {
      serverChange = this.deserializeChange(serverChange)
      this._applyRemoteChange(serverChange)
    }
    this.version = serverVersion

    // TODO: Do it without timeout
    // We should wait until collaborators will be transfered from server
    setTimeout(() => {
      let collaboratorsChanged = this._updateCollaborators(collaborators)
      if (collaboratorsChanged) {
        this.emit('collaborators:changed')
      }
    }, 500)

    // Important: after sync is done we need to reset _pendingChange and _error
    // In this state we can safely listen to
    this._pendingChange = null
    this._pendingSync = false
    this._error = null
    // Each time the sync worked we consider the system connected
    this._connected = true
    this.startFlow()
    this.emit('connected')
    // Attempt to sync again (maybe we have new local changes)
    this._requestSync()
  }

  _updateCollaborators(collaborators) {
    let collaboratorsChanged = false
    let allCollaboratorsIds = Object.keys(this.collaborators)
    let activeCollaborators = filter(collaborators, c => { return c !== null })
    let activeCollaboratorsIds = map(activeCollaborators, c => { return c.userId })
    let nonActiveCollabortorIds = difference(allCollaboratorsIds, activeCollaboratorsIds)

    activeCollaboratorsIds.forEach(collaboratorId => {
      let collaboratorData = this.collaborators[collaboratorId]
      if(!collaboratorData) {
        this.emit('collaborator:add', collaboratorId)
        collaboratorsChanged = true
      } else {
        if(!collaboratorData.active) {
          this.collaborators[collaboratorId].active = true
          collaboratorsChanged = true
        }
      }
    })

    nonActiveCollabortorIds.forEach(collaboratorId => {
      let collaboratorData = this.collaborators[collaboratorId]
      if(collaboratorData.active) {
        this.collaborators[collaboratorId].active = false
        collaboratorsChanged = true
      }
    })

    return collaboratorsChanged
  }

  /*
    Sets the correct state after a collab session has been disconnected
    either explicitly or triggered by a connection drop out.
  */
  _afterDisconnected() {
    this._connected = false
    this.emit('disconnected')
  }
}

export default PublisherSession