import { Document } from 'substance'
import EntityIndex from '../common/EntityIndex'

/*
  Archivist Interview model.
*/

class Interview extends Document {
  constructor(...args) {
    super(...args)
    this._initialize()
  }

  _initialize() {
    this.create({
      type: 'container',
      id: 'body',
      nodes: []
    })

    this.addIndex('entities', new EntityIndex())
  }

  getDocumentMeta() {
    return this.get('meta')
  }

}

export default Interview