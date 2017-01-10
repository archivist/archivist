import { HTMLImporter } from 'substance'
import each from 'lodash/each'

let converters = []

class SubjectsImporter extends HTMLImporter {

  importDocument(subjectsData, reader) {
    this.reset()

    let doc = this.generateDocument()
    each(subjectsData, function(subject) {

      if(reader) {
        doc.create({
          id: subject.entityId,
          type: 'subject',
          name: subject.name,
          position: subject.position,
          count: 0,
          parent: subject.parent || 'root'
        })
      } else {
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
      }
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
