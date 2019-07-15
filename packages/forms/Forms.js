import { DefaultDOMElement, EventEmitter, BodyScrollPanePackage } from 'substance'
import { forEach } from 'lodash-es'
import MultipleField from './multiple-field/MultipleField'
import ReferenceField from './reference-field/ReferenceField'
import RichTextArea from './rich-text-area/RichTextArea'
import SelectField from './select-field/SelectField'
import TagsField from './tags-field/TagsField'
import TextField from './text-field/TextField'
import ToggleField from './toggle-field/ToggleField'

const { BodyScrollPane } = BodyScrollPanePackage

export default class Forms extends EventEmitter {
  constructor(config) {
    super(config)
    this.configurator = config.configurator
    this._editables = {}
    this.bodyScrollPane = BodyScrollPane.mount({}, document.body)
    this.bodyScrollPane.on('selection:positioned', this._onSelectionPositioned, this)
  }

  dispose() {
    this.bodyScrollPane.off(this)
    forEach(this._editables, (editor, editorId) => {
      this.removeRichTextArea(editorId)
    })
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
    this._editables[editorId].dispose()
    this._editables[editorId].remove()
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
    let configurator = this.configurator

    let field = TextField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addSelectField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = SelectField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addTagsField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = TagsField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addToggleField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = ToggleField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addMultipleField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = MultipleField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addReferenceField(fieldId, el, config) {
    config = config || {}
    let resourceClient = this.context.resourceClient
    config.resourceClient = resourceClient
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = ReferenceField.mount({
      fieldId,
      config,
      configurator
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
