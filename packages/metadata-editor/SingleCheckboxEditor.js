import { Component } from 'substance'

class SingleCheckboxEditor extends Component {

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

  render($$) {
    let label = this.props.label
    let el = $$('div').addClass('sc-single-checkbox-editor')

    el.append(
      $$('div').addClass('se-checkbox-wrapper').append(
        $$('input').attr({name: this.props.name, id: this.props.name, type: 'checkbox'}).ref('input'),
        $$('label').attr({for: this.props.name}).addClass('se-label').append(label)
      ).on('click', this._onClick)
    )

    return el
  }

  setValue(value) {
    let input = this.refs.input
    let checkboxEl = input.getNativeElement()
    checkboxEl.checked = value ? true : false
  }

  getValue() {
    let input = this.refs.input
    let checkboxEl = input.getNativeElement()
    let value = false
    if(checkboxEl.checked) value = true

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

export default SingleCheckboxEditor