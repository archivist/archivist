import { Component } from 'substance'
import { each } from 'lodash-es'
import Forms from './Forms'

class NodeForm extends Component {
  constructor(...args) {
    super(...args)

    this.forms = new Forms({configurator: this.context.configurator})
    this.node = this.getNode()
    this.schema = this.getSchema()
    this.fields = {}
  }

  didMount() {
    each(this.fields, function(field, id) {
      if(field.config.placeholder) {
        field.config.placeholder = this.getLabel(field.config.placeholder)
      }

      if(field.config.type === 'text') {
        this.forms.addTextField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'prose') {
        field.value = field.value || '<p>' + field.config.placeholder + '</p>'
        this.forms.addRichTextArea(id, this.refs[id].getNativeElement())
        this.forms.setHTML(id, field.value)
      } else if(field.config.type === 'select') {
        this.forms.addSelectField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'tags') {
        this.forms.addTagsField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'multiple') {
        this.forms.addMultipleField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'toggle') {
        this.forms.addToggleField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      }
    }.bind(this))

    this.forms.on('commit', this._commit, this)
  }

  dispose() {
    super.dispose()
    this.forms.off(this)
    this.forms.dispose()
  }

  prepare($$) {
    each(this.schema, (prop, id) => {
      if(prop.definition.field) {
        this.fields[id] = {
          comp: $$('div').addClass('sc-field').ref(id),
          config: prop.definition.field,
          value: this.node[id]
        }
      }
    })
  }

  getNode() {
    return this.props.node
  }

  getSession() {
    return this.props.session
  }

  getSchema() {
    let schema = this.node.constructor.schema
    if (schema) {
      return schema
    } else {
      throw new Error('Contract: Node.schema must have a value')
    }
  }

  render($$) {
    this.prepare($$)

    let el = $$('div')
      .addClass('sc-form')

    each(this.fields, field => {
      el.append(field.comp)
    })

    return el
  }

  _commit(name, value) {
    let node = this.getNode()
    let session = this.getSession()

    session.transaction(tx => {
      tx.set([node.id, name], value)
    })
  }
}

export default NodeForm
