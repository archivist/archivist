import Field from './Field'

class Checkbox extends Field {

  getFieldValue() {
    let value = this.refs.input.$el[0].checked
    return value
  }
  
  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()
    
    let el = $$('div')
      .addClass('sc-field sc-field-checkbox sc-field-' + name)

    let input = $$('input').attr({type: "checkbox"})
      .ref('input')
      .on('change', this.commit)

    if(value) {
      input.attr({checked: "checked"})
    }

    let label = $$('label')
      .append(input)
      .append(config.placeholder)

    el.append(label)
    
    return el
  }
}

export default Checkbox
