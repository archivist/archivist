import { DefaultDOMElement, EventEmitter, BodyScrollPane } from 'substance'
import RichTextArea from './rich-text-area/RichTextArea'

export default class Forms extends EventEmitter {
  constructor(...args) {
    super(...args)
    this._editables = {}
    this.bodyScrollPane = BodyScrollPane.mount({}, document.body)
    this.bodyScrollPane.on('selection:positioned', this._onSelectionPositioned, this)
  }

  dispose() {
    this.bodyScrollPane.off(this)
  }

  addRichTextArea(editorId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let html = el.innerHTML
    // We remove the old content, and replace it with an editor
    el.innerHTML = ''
    let richTextArea = RichTextArea.mount({
      scrollPane: this.bodyScrollPane,
      editorId,
      html,
      config
    }, el)
    richTextArea.on('selection:positioned', this._onSelectionPositioned, this)
    richTextArea.on('selection:changed', this._onSelectionChanged, this)
    richTextArea.on('document:changed', this._onDocumentChanged, this)
    this._editables[editorId] = richTextArea
    return richTextArea
  }

  _onSelectionPositioned(hints) {
    this.emit('selection:positioned', hints)
  }

  _onSelectionChanged(params) {
    this.emit('selection:changed', params)
  }

  _onDocumentChanged(params) {
    this.emit('document:changed', params)
  }

  removeRichTextArea(editorId) {
    this._editables[editorId].off(this)
  }

  getHTML(editorId) {
    return this._editables[editorId].getHTML()
  }

  setHTML(editorId, html) {
    let editor = this._editables[editorId]
    editor.extendProps({
      html: html
    })
  }
}
