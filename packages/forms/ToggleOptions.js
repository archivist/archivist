import Field from './Field'

class ToggleOptions extends Field {

  getFieldValue() {
    let value = this.props.value
    return value
  }

  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()
    let options = config.options

    let el = $$('div')
      .addClass('sc-field sc-field-toggle sc-field-' + name)

    let on = $$('div').addClass('se-on').append(options.on)
      .on('click', this._setOn)
    let off = $$('div').addClass('se-off').append(options.off)
      .on('click', this._setOff)
    let unknown = $$('div').addClass('se-unknown').append('Unknown')
      .on('click', this._setUnknown)

    if(value === options.on) {
      on.addClass('active')
    } else if (value === options.off) {
      off.addClass('active')
    } else {
      unknown.addClass('active')
    }
    
    let item = $$('div').addClass('se-toggle-item').append(
      on,
      off,
      unknown
    )

    el.append(item)

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))

    return el
  }

  _setOn() {
    let config = this.getConfig()
    let options = config.options
    this.extendProps({value: options.on})
    this.commit()
  }

  _setOff() {
    let config = this.getConfig()
    let options = config.options
    this.extendProps({value: options.off})
    this.commit()
  }

  _setUnknown() {
    this.extendProps({value: null})
    this.commit()
  }
}

export default ToggleOptions
