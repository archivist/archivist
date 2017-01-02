import { HTMLImporter } from 'substance'
import each from 'lodash/each'

let converters = []

class SubjectsImporter extends HTMLImporter {

  importDocument(subjectsData) {
    this.reset()

    let doc = this.generateDocument()
    each(subjectsData, function(subject) {
      doc.create({
        id: subject.entityId,
        type: 'subject',
        name: subject.data.name,
        workname: subject.data.workname,
        position: subject.data.position,
        count: parseInt(subject.count, 10),
        description: subject.data.description,
        parent: subject.data.parent || 'root'
      })
    })

    return doc
  }

  /*
    Takes an HTML string.
  */
  convertDocument(bodyEls) {
    // Just to make sure we always get an array of elements
    if (!bodyEls.length) bodyEls = [bodyEls]
    this.convertContainer(bodyEls, 'body')
  }
}

SubjectsImporter.converters = converters

export default SubjectsImporter
