import { Component, FontAwesomeIcon as Icon } from 'substance'

class MultipleField extends Component {
  constructor(...args) {
    super(...args)
    this.configurator = this.props.configurator
    this.labelProvider = this.configurator.getLabelProvider()
  }

  render($$) {
    let config = this.props.config
    let el = $$('div').addClass('sc-field-multiple sc-field-' + this.props.fieldId)
      .on('click', this._onClick)

    let tagsWidget = $$('div').addClass('se-tag')
    let values = this.state.values || []
    let options = config.options
    let availableOptions = options.filter(x => values.indexOf(x) === -1)
    let openDialog = this.state.openDialog || false

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
      $$('div').addClass('se-toggle-dialog').append(
        $$(Icon, {icon: 'fa fa-filter'})
      ).on('click', this._toggleDialog),
      tagsWidget
    )

    if(availableOptions && openDialog) {
      let optionsWidget = $$('div').addClass('se-options')
      availableOptions.forEach(opt => {
        optionsWidget.append($$('div').addClass('se-item').append(opt).on('click', this._addValue.bind(this, opt)))
      })
      el.append(optionsWidget)
    }

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))
    
    return el
  }

  getLabel(name) {
    return this.labelProvider.getLabel(name)
  }

  setValue(value) {
    this.extendState({values: value})
  }

  getValue() {
    return this.state.values
  }

  _onClick() {
    let openDialog = this.state.openDialog
    if(openDialog) {
      this._toggleDialog()
    }
    this.extendState({highlighted: undefined})
  }

  _toggleDialog(e) {
    if(e) e.stopPropagation()
    let current = this.state.openDialog || false
    this.extendState({openDialog: !current})
  }

  _addValue(value, e) {
    if(e) e.stopPropagation()
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

export default MultipleField