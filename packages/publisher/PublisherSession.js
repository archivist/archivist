import { CollabSession } from 'substance'

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
}

export default PublisherSession