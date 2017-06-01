import Field from './Field'

class Prose extends Field {
  
  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()
    
    let el = $$('div')
      .addClass('sc-field sc-field-prose sc-field-' + name)
    let input = $$('textarea').addClass('sc-textarea').attr({rows: 5}).append(value)
      .ref('input')
      .on('change', this.commit)
    
    el.append(input)

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }
}

export default Prose
