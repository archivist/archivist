import Field from './Field'

class Text extends Field {
  
  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()
    
    let el = $$('div')
      .addClass('sc-field sc-field-text sc-field-' + name)

    let input = $$('input').addClass('sc-input').attr({type: config.dataType, placeholder: config.placeholder, value: value})
      .ref('input')
      .on('change', this.commit)
    
    el.append(input)

    if(config.placeholder && value !== "") el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }
}

export default Text
