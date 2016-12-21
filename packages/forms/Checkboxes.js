import Field from './Field'
import each from 'lodash/each'

class Checkboxes extends Field {

  getFieldValue() {
    let config = this.getConfig()
    let options = config.options
    let result = []
    let checkboxes = this.refs.checkboxes.getChildren()
    each(checkboxes, function(checkbox, i) {
      let value = checkbox.children[0].$el[0].checked
      if(value) result.push(options[i])
    })
    return result
  }
  
  render($$) {
    let self = this

    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()

    let el = $$('div')
      .addClass('sc-field sc-field-checkboxes sc-field-' + name)

    let checkboxes = $$('div').ref('checkboxes')

    each(config.options, function(option) {

      let input = $$('input').attr({type: "checkbox"})
        .on('change', self.commit)

      if(value.indexOf(option) > -1) {
        input.attr({checked: "checked"})
      }

      let label = $$('label')
        .append(input)
        .append(option)

      checkboxes.append(label)

    })

    el.append(checkboxes)

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
  
    return el
  }
}

export default Checkboxes
