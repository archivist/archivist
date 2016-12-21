import Field from './Field'
import each from 'lodash/each'

class Select extends Field {
  
  getFieldValue() {
    let value = this.refs.input.val()
    if(value === 'null') value = null
    return value
  }

  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()

    let select = $$('select').ref('input').on('change', this.commit)

    let option = $$('option').attr({value: null}).append('Unknown')
    if(value === null) option.attr({selected: "selected"})
    select.append(option)

    each(config.options, function(opt) {
      let option = $$('option').attr({value: opt}).append(opt)
      if(opt === value) option.attr({selected: "selected"})
      select.append(option)
    })

    let el = $$('div')
      .addClass('sc-field sc-field-select sc-field-' + name)

    el.append(select)
    
    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))

    return el
  }
}

export default Select
