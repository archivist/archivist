import { Component } from 'substance'

class SelectEditor extends Component {

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
    let options = this.props.options
    let el = $$('div').addClass('sc-select-editor')

    let select = $$('select')
      .ref('input')
      .on('change', this._onChange)

    options.forEach(opt => {
      let option = $$('option').attr({value: opt}).append(opt)
      select.append(option)
    })

    el.append(select)

    return el
  }

  setValue(value) {
    if(value) this.refs.input.val(value)
  }

  getValue() {
    return this.refs.input.val()
  }

  getPath() {
    return this.props.path
  } 

  _onChange() {
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

export default SelectEditor