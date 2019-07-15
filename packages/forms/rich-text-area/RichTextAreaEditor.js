import { ProseEditorPackage, ContainerEditor } from 'substance'
const { ProseEditor } = ProseEditorPackage

/**
  Configurable ProseEditor component
  @example
  ```js
  const cfg = new Configurator()
  cfg.import(ProseEditorPackage)
  cfg.import(SuperscriptPackage)
  window.onload = function() {
    let doc = configurator.createDocument(fixture)
    let editorSession = new EditorSession(doc, {
      configurator: configurator
    })
    RichTextAreaEditor.mount({
      editorSession: editorSession
    }, document.body)
  }
  ```
*/

// TODO: Check if we can inherit from AbstractEditor
class RichTextAreaEditor extends ProseEditor {

  didMount() {
    // Register editor overlays
    let configurator = this.getConfigurator()
    let scrollPane = this.context.scrollPane
    let Overlay = this.componentRegistry.get('overlay')
    let Dropzones = this.componentRegistry.get('dropzones')

    this.overlay = new Overlay(this, {
      toolPanel: configurator.getToolPanel('main-overlay')
    }).mount(scrollPane.el)

    this.dropzones = new Dropzones(this, {}).mount(scrollPane.el)
  }

  dispose() {
    super.dispose()
    this.overlay.remove()
    this.dropzones.remove()
  }

  render($$) {
    let el = $$('div').addClass('sc-rich-text-area-editor')
    let configurator = this.getConfigurator()

    el.append(
      $$(ContainerEditor, {
        disabled: this.props.disabled,
        editorSession: this.editorSession,
        node: this.doc.get('body'),
        commands: configurator.getSurfaceCommandNames(),
        placeholder: this.props.placeholder
      }).ref('body')
    )
    return el
  }

}

export default RichTextAreaEditor
