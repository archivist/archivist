import Field from './Field'
import each from 'lodash/each'

class Radio extends Field {

  getFieldValue() {
    let config = this.getConfig()
    let options = config.options
    let result = ""
    let radios = this.refs.radio.getChildren()
    each(radios, function(radio, i) {
      let value = radio.children[0].$el[0].checked
      if(value) result = options[i]
    })
    return result
  }
  
  render($$) {
    let self = this

    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()

    let el = $$('div')
      .addClass('sc-field sc-field-radio sc-field-' + name)

    let radios = $$('div').ref('radio')

    each(config.options, function(option) {

      let input = $$('input').attr({type: "radio", name: name})
        .on('change', self.commit)

      if(value.indexOf(option) > -1) {
        input.attr({checked: "checked"})
      }

      let label = $$('label')
        .append(input)
        .append(option)

      radios.append(label)

    })
    el.append(radios)
    
    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }
}

export default Radio
