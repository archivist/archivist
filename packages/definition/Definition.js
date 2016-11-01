import { DocumentNode } from 'substance'

class Definition extends DocumentNode {
  
  // Get entity name
  getName() {
    return this.title
  }

}

/*
  Entities Definition node.
  Holds Definition entity.
  
  Attributes
  title: { type: 'Text', validators: ['required'], title: 'Title', editorAttrs: {placeholder: "Title", autofocus:'autofocus'} },
    synonyms: {type:'Select2', options:[], config: {tags: true, placeholder: "Synonyms", tokenSeparators: [','], theme: "bootstrap"}, multiple: true},
    definition_type: { title: 'Type', type:'Select2', options:['общий комментарий', 'лагерная реалия', 'сокращение', 'языковой комментарий'], config: {placeholder: "Definition type", theme: "bootstrap"}},
    description
    - title Definition title
    - synonyms Definiiton synonyms
    - definition_type Definition type
    - description Definition description
*/

Definition.define({
  title: { type: 'string', default: 'Unknown definition', field: { type: "text", dataType: "text", placeholder: "Enter definition's name" }},
  synonyms: { type: ['string'], default: [], field: { type: "multiple", placeholder: "Enter definition's synonyms" }},
  definition_type: { type: 'string', default: '', field: { type: "select", options: ['общий комментарий', 'лагерная реалия', 'сокращение', 'языковой комментарий'], placeholder: "Pick a definition type" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter definition's description" }}
})

export default Definition