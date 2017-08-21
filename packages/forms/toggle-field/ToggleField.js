import { Component } from 'substance'

class ToggleField extends Component {
  constructor(...args) {
    super(...args)
    this.configurator = this.props.configurator
    this.labelProvider = this.configurator.getLabelProvider()
  }

  render($$) {
    let config = this.props.config
    let value = this.state.value
    let el = $$('div').addClass('sc-field-toggle sc-field-' + this.props.fieldId)

    let on = $$('div').addClass('se-on').append(this.getLabel('toggle-yes'))
      .on('click', this._setOn)
    let off = $$('div').addClass('se-off').append(this.getLabel('toggle-no'))
      .on('click', this._setOff)
    let unknown = $$('div').addClass('se-unknown')

    if(value === true) {
      on.addClass('active')
    } else if (value === false) {
      off.addClass('active')
    } else {
      unknown.addClass('active')
    }
    
    let item = $$('div').addClass('se-toggle-item').append(
      on,
      off
    )

    if(config.nullable !== false) {
      unknown.append(this.getLabel('toggle-unknown'))
      unknown.on('click', this._setUnknown)
      item.append(unknown)
    } else {
      el.addClass('se-not-nullable')
    }

    el.append(item)

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }

  getLabel(name) {
    return this.labelProvider.getLabel(name)
  }

  setValue(value) {
    this.extendState({value: value})
  }

  getValue() {
    return this.state.value
  }

  _setOn() {
    this.extendState({value: true})
    this._commit()
  }

  _setOff() {
    this.extendState({value: false})
    this._commit()
  }

  _setUnknown() {
    this.extendState({value: null})
    this._commit()
  }

  _commit() {
    let name = this.props.fieldId
    let value = this.getValue()
    this.emit('commit', name, value)
  }

}

export default ToggleField