import { Component, InputPackage } from 'substance'

const { Input } = InputPackage

class TextField extends Component {
  constructor(...args) {
    super(...args)
    this.configurator = this.props.configurator
    this.labelProvider = this.configurator.getLabelProvider()
  }

  render($$) {
    let config = this.props.config
    let el = $$('div').addClass('sc-field-text sc-field-' + this.props.fieldId)

    let input = $$(Input, {type: config.dataType, placeholder: config.placeholder})
      .ref('input')
      .on('change', this._onChange)
    
    el.append(
      input,
      $$('div').addClass('help').append(config.placeholder)
    )
    
    return el
  }

  getLabel(name) {
    return this.labelProvider.getLabel(name)
  }

  setValue(value) {
    this.refs.input.val(value)
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

export default TextField