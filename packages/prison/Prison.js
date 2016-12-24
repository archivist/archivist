import { DocumentNode } from 'substance'

class Prison extends DocumentNode {
  
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
    synonyms.push(this.name, this.nearestLocality)
    return synonyms
  }

}

Prison.type = 'prison'

/*
  Entities Prison node.
  Holds Prison entity.

  Attributes
    - name Prison name
    - nearestLocality Nearest location to prisom
    - prisonType Type of prison
    - synonyms List of prison synonyms
    - country Country of prison
    - point Geographical point coordinates (Long, Lat)
    - description Prison description
*/

Prison.define({
  name: { type: 'string', default: 'Untitled prison', field: { type: "text", dataType: "text", placeholder: "Enter prison's name" }},
  nearestLocality: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "Enter nearest locality name" }},
  prisonType: {type: ['string'], default: [], field: { type: "multiple", options: ['рабочий лагерь', 'пересыльный лагерь', 'штрафлагерь', 'проверочно-фильтрационный лагерь НКВД', 'тюрьма', 'лагерь военнопленных', 'концлагерь', 'ГУЛаг', 'ферма', 'учебный лагерь', 'лагерь для перемещенных лиц', 'распределительный лагерь', 'лагерь внешней команды концлагеря', 'частный дом', 'неизвестно'], placeholder: "Select type of prison" }},
  synonyms: {type: ['string'], default: [], field: { type: "multiple", placeholder: "Enter synonyms of prison" }},
  country: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "Enter tprison's country" }},
  point: { type: ['number'], default: [], field: { type: "map", dataType: "point", placeholder: "Place prison location on map" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter prison's description" }}
})

export default Prison