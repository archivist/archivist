import { DefaultDOMElement, EventEmitter, BodyScrollPanePackage } from 'substance'
import MultipleField from './multiple-field/MultipleField'
import RichTextArea from './rich-text-area/RichTextArea'
import SelectField from './select-field/SelectField'
import TagsField from './tags-field/TagsField'
import TextField from './text-field/TextField'
import ToggleField from './toggle-field/ToggleField'

const { BodyScrollPane } = BodyScrollPanePackage

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

  _onCommit(name, value) {
    this.emit('commit', name, value)
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

  addTextField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)

    let field = TextField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addSelectField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let field = SelectField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addTagsField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let field = TagsField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addToggleField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let field = ToggleField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addMultipleField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let field = MultipleField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  getValue(fieldId) {
    return this._editables[fieldId].getValue()
  }

  setValue(fieldId, value) {
    return this._editables[fieldId].setValue(value)
  }
}
