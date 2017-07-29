import { Component, Input } from 'substance'

class TagsField extends Component {

  render($$) {
    let config = this.props.config
    let el = $$('div').addClass('sc-field-tags sc-field-' + this.props.fieldId)
      .on('click', this._onClick)

    let tagsWidget = $$('div').addClass('se-tag')
    let values = this.state.values
    
    if(values) {
      values.forEach(value => {
        let item = $$('div').addClass('se-value')
          .append(value)
          .on('click', this._removeValue.bind(this, value))

        if(this.state.highlighted === value) {
          item.addClass('se-hihglight-remove')
        }

        tagsWidget.append(item)
      })
    }

    el.append(
      tagsWidget,
      $$(Input, {type: 'text', placeholder: 'Add values'})
        .ref('input')
        .on('keyup', this._onKeyUp)
    )

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }

  setValue(value) {
    this.extendState({values: value})
  }

  getValue() {
    return this.state.values
  }

  _onClick() {
    this.extendState({highlighted: undefined})
  }

  _onKeyUp(e) {
    let key = e.keyCode || e.which
    let value
    if (key === 13 || e.key === ',') {
      value = this.refs.input.val().replace(',', '')
      this._addValue(value)
      return this.refs.input.val('')
    } else if (e.key === 8) {
      if (this.refs.value.val() === '') {
        value = this.refs.input.val().replace(',', '')
        return this._deleteValue(value)
      }
    }
  }

  _addValue(value, e) {
    if(e) e.stopPropagation()
    if(value === '') return
    let values = this.state.values
    values.push(value)
    this.extendState({values: values})
    this._commit()
  }

  _removeValue(value, e) {
    e.stopPropagation()
    let highlighted = this.state.highlighted
    if(highlighted === value) {
      this._deleteValue(value)
    } else {
      this.extendState({highlighted: value})
    }
  }

  _deleteValue(value) {
    let values = this.state.values
    let pos = values.indexOf(value)
    values.splice(pos, 1)
    this.extendState({values: values, highlighted: undefined})
    this._commit()
  }

  _commit() {
    let name = this.props.fieldId
    let value = this.getValue()
    this.emit('commit', name, value)
  }

}

export default TagsField