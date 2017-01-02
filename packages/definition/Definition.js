import { DocumentNode } from 'substance'

/*
  Entities Definition node.
  Holds Definition entity.
  
  Attributes
    - title Definition title
    - synonyms Definiiton synonyms
    - definition_type Definition type
    - description Definition description
*/
class Definition extends DocumentNode {
  
  // Get entity name
  getName() {
    return this.title
  }

  // Get entity description
  getDescription() {
    return this.description
  }

  // Get entity synonyms
  getSynonyms() {
    let synonyms = this.synonyms
    synonyms.push(this.title)
    return synonyms
  }
}

Definition.type = 'definition'

Definition.define({
  title: { type: 'string', default: 'Unknown definition', field: { type: "text", dataType: "text", placeholder: "Enter definition's title" }},
  synonyms: {type: ['string'], default: [], field: { type: "multiple", placeholder: "Enter synonyms of a definition" }},
  definitionType: { type: 'string', default: '', field: { type: "select", options: ['общий комментарий', 'лагерная реалия', 'сокращение', 'языковой комментарий'], placeholder: "Select a definition type" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter definition's description" }}
})

export default Definition