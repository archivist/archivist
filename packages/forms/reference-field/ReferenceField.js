import { Component, FontAwesomeIcon as Icon } from 'substance'

class ReferenceField extends Component {
  constructor(...args) {
    super(...args)
    this.config = this.props.config
    this.configurator = this.props.configurator
    this.labelProvider = this.configurator.getLabelProvider()
    this.componentRegistry = this.getComponentRegistry()

    this.handleActions({
      'selectEntity': this._addValue,
      'closeResourceOperator': this._toggleDialog
    })
  }

  getChildContext() {
    return {
      configurator: this.configurator,
      componentRegistry: this.componentRegistry,
      labelProvider: this.labelProvider,
      resourceClient: this.config.resourceClient,
      editorSession: {}
    }
  }

  getComponentRegistry() {
    let componentRegistry = this.configurator.getComponentRegistry()
    return componentRegistry
  }

  getInitialState() {
    return {
      labels: {},
      values: []
    }
  }

  render($$) {
    let config = this.props.config
    let el = $$('div').addClass('sc-field-reference sc-field-' + this.props.fieldId)

    let tagsWidget = $$('div').addClass('se-tag')
    let openDialog = this.state.openDialog || false
    let labels = this.state.labels
    let values = this.state.values || []
    if(!config.multi && values.constructor !== Array) {
      values = [this.state.value]
    }

    if(values) {
      values.forEach(value => {
        let label = labels[value] || value
        let item = $$('div').addClass('se-value')
          .append(label)
          .on('click', this._removeValue.bind(this, value))

        if(this.state.highlighted === value) {
          item.addClass('se-hihglight-remove')
        }

        tagsWidget.append(item)
      })
    }

    if(openDialog) {
      const Modal = this.getComponent('modal')
      const ResourceOperator = this.getComponent('resource-operator')
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(ResourceOperator, {mode: 'search', entityType: config.entityType, parent: config.parent})
        ).ref('modal')
      )
    }

    el.append(
      $$('div').addClass('se-toggle-dialog').append(
        $$(Icon, {icon: 'fa fa-filter'})
      ).on('click', this._toggleDialog),
      tagsWidget
    )

    if(config.placeholder) el.append($$('div').addClass('help').append(config.placeholder))

    return el
  }

  getLabel(name) {
    return this.labelProvider.getLabel(name)
  }

  setValue(value) {
    this._loadValues(value)
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
    if(values.indexOf(value) < 0) {
      values.push(value)
      this.extendState({values: values})
      this._loadValue(value)
      this._commit()
    }
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

  _loadValues(values) {
    let config = this.props.config
    let resourceClient = config.resourceClient
    if(values.length > 0) {
      resourceClient.listEntities({entityId: values}, {limit: 100, columns: ['"entityId"', "name"]}, (err, res) => {
        let labels = this.state.labels
        res.records.forEach(item => {
          labels[item.entityId] = item.name
        })

        this.extendState({labels: labels})
      })
    }
  }

  _loadValue(entityId) {
    let config = this.props.config
    let resourceClient = config.resourceClient
    resourceClient.listEntities({entityId: entityId}, {limit: 100, columns: ['"entityId"', "name"]}, (err, res) => {
      let labels = this.state.labels
      res.records.forEach(item => {
        labels[item.entityId] = item.name
      })

      this.extendState({labels: labels})
    })
  }
}

export default ReferenceField
