import { DocumentNode } from 'substance'

class Person extends DocumentNode {
  
  // Get entity name
  getName() {
    return this.name
  }

}

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
  global: { type: 'boolean', default: false, field: { type: "toggle", placeholder: "Global person" }}
})

export default Person