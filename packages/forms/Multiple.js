import Field from './Field'
import each from 'lodash/each'

class Multiple extends Field {

  getInitialState() {
    return {
      values: this.props.value
    }
  }

  getFieldValue() {
    return this.state.values
  }
  
  render($$) {
    let name = this.getName()
    let config = this.getConfig()
    let values = this.getValue()

    let el = $$('div').addClass('sc-field sc-field-multiple sc-field-' + name)

    let multipleWidget = $$('div').addClass('se-multiple')
    
    each(values, function(value) {
      multipleWidget.append($$('div').addClass('se-value').append(value).on('click', this.removeValue))
    }.bind(this))

    el.append(
      multipleWidget,
      $$('input').attr({type: 'text', placeholder: 'Add values'})
        .ref('value')
        .on('keyup', this.onKeyUp)
    )

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }

  onKeyUp(e) {
    let key = e.keyCode || e.which
    let value
    if (key === 13 || key === 188) {
      value = this.refs.value.val().replace(',', '')
      this.addValue(value)
      return this.refs.value.val('')
    } else if (key === 8) {
      if (this.refs.value.val() === '') {
        value = this.refs.value.val().replace(',', '')
        return this.deleteValue(value)
      }
    }
  }

  addValue(value) {
    let values = this.state.values
    values.push(value)
    this.extendState({values: values})
    this.commit()
  }

  removeValue(e) {
    e.preventDefault()
    let el = e.target
    let highlighted = el.classList.contains('se-hihglight-remove')
    if(highlighted) {
      this.deleteValue(el.textContent)
    } else {
      each(el.parentElement.childNodes, function(node) {
        node.className = 'se-value'
      })
      el.className += ' se-hihglight-remove'
    }
  }

  deleteValue(value) {
    let values = this.state.values
    let pos = values.indexOf(value)
    values.splice(pos, 1)
    this.extendState({values: values})
    this.commit()
  }
}

export default Multiple
