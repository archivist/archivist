import { Component, TextPropertyEditor } from 'substance'
import { forEach } from 'lodash-es'
import SelectEditor from './SelectEditor'
import InputEditor from './InputEditor'
import CheckboxEditor from './CheckboxEditor'
import SingleCheckboxEditor from './SingleCheckboxEditor'

class MetadataEditor extends Component {

  getInitialState() {
    let fields = {}
    let node = this.props.node

    forEach(node.getSchema(), (prop, id) => {
      const propSchema = prop.definition
      if(propSchema.field) {
        if(propSchema.field.collapse && propSchema.field.collapsed === undefined) {
          propSchema.field.collapsed = true
        }

        const group = propSchema.field.group
        if(group) {
          const groupId = 'group-' + group.toLowerCase().replace(' ', '')
          if(!fields[groupId]) {
            fields[groupId] = {
              name: group,
              editor: 'group',
              fields: {}
            }
          }
          fields[groupId].fields[id] = propSchema.field
        } else {
          fields[id] = propSchema.field
        } 
      }
    })

    return {
      fields: fields
    }
  }

  render($$) {
    let el = $$('div').addClass('sc-metadata-editor')

    forEach(this.state.fields, (field, id) => {
      let editorEl = this.renderItem($$, field, id)
      el.append(editorEl) 
    })

    return el
  }


  renderItem($$, field, id) {
    let editorEl = $$('div').addClass('se-field-editor se-field-' + id)

    const editor = field.editor
    switch (editor) {
      case 'group': {
        editorEl.append(
          $$('div').addClass('se-group-name').append(this.getLabel(field.name))
        ).addClass('se-field-group')
        if(field.fields) {
          forEach(field.fields, (item, itemId) => {
            let subEl = this.renderItem($$, item, itemId)
            editorEl.append(subEl) 
          })
        }
        break
      }
      case 'text': {
        editorEl.append(
          $$(TextPropertyEditor, {
            name: id,
            path: ['meta', id],
            multiLine: false
          }).addClass('se-editor')
        )
        break
      }
      case 'multitext': {
        if(field.collapse) {
          let label = $$('div').addClass('se-collapsible-label')
          const collapsed = field.collapsed
          if(collapsed) {
            label.append(
              this.context.iconProvider.renderIcon($$, 'collapsed'),
              this.getLabel(field.collapse)
            ).on('click', this._toogleCollapse.bind(this, id))
            editorEl.append(label)
          } else {
            label.append(
              this.context.iconProvider.renderIcon($$, 'expanded'),
              this.getLabel(field.collapse)
            ).on('click', this._toogleCollapse.bind(this, id))

            editorEl.append(
              label,
              $$(TextPropertyEditor, {
                name: id,
                path: ['meta', id],
                multiLine: true,
                withoutBreak: false
              }).addClass('se-editor')
            )

            const description = field.description
            if(description) {
              editorEl.append(
                $$('div').addClass('se-description').append(this.getLabel(description))
              )
            }
          }
        } else {
          editorEl.append(
            $$(TextPropertyEditor, {
              name: id,
              path: ['meta', id],
              multiLine: true
            }).addClass('se-editor')
          )
        }
        break
      }
      case 'input': {
        editorEl.append(
          $$(InputEditor, {
            name: id,
            path: ['meta', id],
            dataType: field.dataType
          }).ref(id)
        )
        break
      }
      case 'select': {
        editorEl.append(
          $$(SelectEditor, {
            name: id,
            path: ['meta', id],
            options: field.options
          }).ref(id)
        )
        break
      }
      case 'checkbox': {
        editorEl.append(
          $$(CheckboxEditor, {
            name: id,
            path: ['meta', id],
            options: field.options
          }).ref(id)
        ).addClass('se-checkboxes-editor')
        break
      }
      case 'logical': {
        editorEl.append(
          $$(SingleCheckboxEditor, {
            name: id,
            path: ['meta', id],
            label: field.label
          }).ref(id)
        ).addClass('se-checkboxes-editor')
        break
      }
      default:
        console.error('Invalid editor for meta property:', id)
    }

    const description = field.description
    if(description && !field.collapse) {
      editorEl.append(
        $$('div').addClass('se-description').append(this.getLabel(description))
      )
    }

    return editorEl
  }

  _toogleCollapse(id) {
    let fields = this.state.fields
    
    if(fields[id]) {
      let val = fields[id].collapsed
      fields[id].collapsed = !val
    } else {
      forEach(fields, (item, itemId) => {
        if(item.fields) {
          if(item.fields[id]) {
            let val = item.fields[id].collapsed
            fields[itemId].fields[id].collapsed = !val
          }
        }
      })
    }

    this.extendState({fields: fields})
  }
}

export default MetadataEditor
