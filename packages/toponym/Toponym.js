import { DocumentNode } from 'substance'

/*
  Entities Toponym node.
  Holds Toponym entity.

  Attributes
    - name Toponym name
    - currentName Current name of toponym
    - synonyms List of toponym synonyms
    - country Country of toponym
    - point Geographical point coordinates (Long, Lat)
    - description Toponym description
*/
class Toponym extends DocumentNode {
  
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
    let synonyms = this.synonyms
    synonyms.push(this.name, this.currentName)
    return synonyms
  }

}

Toponym.type = 'toponym'

Toponym.define({
  name: { type: 'string', default: 'Unknown toponym', field: { type: "text", dataType: "text", placeholder: "Enter toponym's name" }},
  currentName: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "Enter current name of toponym" }},
  synonyms: {type: ['string'], default: [], field: { type: "multiple", placeholder: "Enter synonyms of toponym" }},
  country: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "Enter toponym's country" }},
  point: { type: ['number'], default: [], field: { type: "map", dataType: "point", placeholder: "Place toponym location on map" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter toponym's description" }}
})

export default Toponym
