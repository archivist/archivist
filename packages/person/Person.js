import { DocumentNode } from 'substance'

class Person extends DocumentNode {
  
  // Get entity name
  getName() {
    return this.name
  }

  // Get entity description
  getDescription() {
    return this.description
  }

  // Get entity synonyms
  getSynonyms() {
    let synonyms = [this.name]
    return synonyms
  }
}

Person.type = 'person'

/*
  Entities Person node.
  Holds Person entity.
  
  Attributes
    - name Person lastname
    - description Person firstname
    - global Person middlename
*/

Person.define({
  name: { type: 'string', default: 'Unknown person', field: { type: "text", dataType: "text", placeholder: "Enter person's name" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter person's description" }},
  global: { type: 'boolean', default: false, field: { type: "toggle", placeholder: "Global person", nullable: false }}
})

export default Person