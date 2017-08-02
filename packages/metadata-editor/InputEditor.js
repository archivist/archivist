import { Component } from 'substance'

class InputEditor extends Component {

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
    const Input = this.getComponent('input')

    let dataType = this.props.dataType
    let el = $$('div').addClass('sc-input-editor')

    let input = $$(Input, {type: dataType})
      .ref('input')
      .on('change', this._onChange)

    el.append(input)

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
    if(this.props.dataType === 'number') value = parseInt(value, 10)
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

export default InputEditor