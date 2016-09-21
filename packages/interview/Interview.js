import { Document } from 'substance'

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
  }

  getDocumentMeta() {
    return this.get('meta')
  }

}

export default Interview