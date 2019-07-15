import { Component } from 'substance'

class SelectField extends Component {
  constructor(...args) {
    super(...args)
    this.configurator = this.props.configurator
    this.labelProvider = this.configurator.getLabelProvider()
  }

  render($$) {
    let config = this.props.config
    let el = $$('div').addClass('sc-field-select sc-field-' + this.props.fieldId)

    let select = $$('select')
      .ref('input')
      .on('change', this._onChange)

    if(config.nullable) {
      let option = $$('option').attr({value: null, selected: "selected"}).append(this.getLabel('select-unknown'))
      select.append(option)
    }

    config.options.forEach(opt => {
      let option = $$('option').attr({value: opt}).append(opt)
      select.append(option)
    })


    el.append(
      select,
      $$('div').addClass('help').append(config.placeholder)
    )

    return el
  }

  getLabel(name) {
    return this.labelProvider.getLabel(name)
  }

  setValue(value) {
    if(value) this.refs.input.val(value)
  }

  getValue() {
    return this.refs.input.val()
  }

  _onChange() {
    let name = this.props.fieldId
    let value = this.getValue()
    this.emit('commit', name, value)
  }

}

export default SelectField