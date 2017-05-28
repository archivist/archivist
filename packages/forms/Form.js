import { Component } from 'substance'
import { each } from 'lodash-es'
import Text from './Text'
import Checkbox from './Checkbox'
import Select from './Select'
import DateField from './Date'
import Radio from './Radio'
import Checkboxes from './Checkboxes'
import Prose from './Prose'
import Toggle from './Toggle'
import ToggleOptions from './ToggleOptions'
import Multiple from './Multiple'
import Reference from './Reference'

class Form extends Component {
  constructor(...args) {
    super(...args)

    this.node = this.getNode()
    this.schema = this.getSchema()
    this.fields = {}
  }


  prepare($$) {
    each(this.schema, (prop, id) => {
      if(prop.definition.field) {
        let config = prop.definition.field
        let value = this.node[id]
        this.fields[id] = this.createField($$, id, config, value)
      }
    })
  }

  getNode() {
    return this.props.node
  }

  getSchema() {
    let schema = this.node.constructor.schema
    if (schema) {
      return schema
    } else {
      throw new Error('Contract: Node.schema must have a value')
    }
  }

  getField(type) {
    let field = this.constructor.fields[type]
    if(field) {
      return field
    } else {
      throw new Error('No constructor for field type: ' + type)
    }
  }

  createField($$, id, config, value) {
    let fieldType = config.type
    let Field = this.getField(fieldType)
    let el = $$(Field, {id: id, config: config, value: value, form: this})
    return el
  }

  render($$) {
    this.prepare($$)

    let el = $$('div')
      .addClass('sc-form')

    each(this.fields, function(field) {
      el.append(field)
    })

    return el
  }
}

Form.fields = {
  text: Text,
  checkbox: Checkbox,
  select: Select,
  date: DateField,
  radio: Radio,
  checkboxes: Checkboxes,
  prose: Prose,
  toggle: Toggle,
  'toggle-options': ToggleOptions,
  multiple: Multiple,
  reference: Reference
}

export default Form
