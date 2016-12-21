import Field from './Field'

class Toggle extends Field {

  getFieldValue() {
    let value = this.props.value
    return value
  }

  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let value = this.getValue()

    let el = $$('div')
      .addClass('sc-field sc-field-toggle sc-field-' + name)

    let on = $$('div').addClass('se-on').append('Yes')
      .on('click', this._setOn)
    let off = $$('div').addClass('se-off').append('No')
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
      unknown.append('Unknown')
      unknown.on('click', this._setUnknown)
      item.append(unknown)
    } else {
      el.addClass('se-not-nullable')
    }

    el.append(item)

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))

    return el
  }

  _setOn() {
    this.extendProps({value: true})
    this.commit()
  }

  _setOff() {
    this.extendProps({value: false})
    this.commit()
  }

  _setUnknown() {
    this.extendProps({value: null})
    this.commit()
  }
}

export default Toggle
