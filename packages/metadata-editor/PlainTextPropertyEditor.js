import { TextPropertyEditor } from 'substance'

class PlainTextPropertyEditor extends TextPropertyEditor {
  _onPaste(event) {
    let clipboardData = event.clipboardData

    let types = {}
    for (let i = 0; i < clipboardData.types.length; i++) {
      types[clipboardData.types[i]] = true
    }

    event.preventDefault()
    event.stopPropagation()

    let plainText = clipboardData.getData('text/plain')
    this.clipboard._pastePlainText(plainText)
  }
}

export default PlainTextPropertyEditor
