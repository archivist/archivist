import { Component } from 'substance'

class CheckboxEditor extends Component {

  dispose() {
    super.dispose.call(this)
    this.context.editorSession.off(this)
  }

  didMount() {
    let doc = this.context.doc
    let path = this.getPath()
    let value = doc.get(path)
    this.setValue(value)
    this.context.editorSession.onRender('document', this._onDocumentChange, this)
  }

  didUpdate() {
    let doc = this.context.doc
    let path = this.getPath()
    let value = doc.get(path)
    this.setValue(value)
  }

  render($$) {
    let options = this.props.options
    let el = $$('div').addClass('sc-checkbox-editor').ref('input')

    let checkboxes = options.map((item, i) => {
      let label = typeof item === 'string' ? item : item.label
      let value = typeof item === 'string' ? item : item.id
      return $$('div').addClass('se-checkbox-wrapper').append(
        $$('input').attr({name: this.props.name, id: this.props.name + '_' + i, value: value, type: 'checkbox'}),
        $$('label').attr({for: this.props.name + '_' + i}).addClass('se-label').append(label)
      ).on('click', this._onClick)
    })

    el.append(checkboxes)

    return el
  }

  setValue(value) {
    let input = this.refs.input
    let checkboxes = input.findAll(['input'])
    checkboxes.forEach(checkbox => {
      let checkboxEl = checkbox.getNativeElement()
      checkboxEl.checked = false
    })
    value.forEach(val => {
      let checkbox = input.find('[value="' + val + '"]')
      let checkboxEl = checkbox.getNativeElement()
      checkboxEl.checked = true
    })
  }

  getValue() {
    let input = this.refs.input
    let checkboxes = input.findAll(['input'])
    let value = []
    checkboxes.forEach(checkbox => {
      let checkboxEl = checkbox.getNativeElement()
      if(checkboxEl.checked) value.push(checkboxEl.value)
    })
    return value
  }

  getPath() {
    return this.props.path
  }

  _onClick() {
    let editorSession = this.context.editorSession
    let path = this.getPath()
    let value = this.getValue()
    editorSession.transaction(tx => {
      tx.set(path, value)
    })
  }

  _onDocumentChange(update) {
    let path = this.getPath()
    if (update.updated[path]) {
      let doc = this.context.doc
      let value = doc.get(path)
      this.setValue(value)
    }
  }

}

export default CheckboxEditor
