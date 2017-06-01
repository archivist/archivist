import { ProseEditor, ContainerEditor } from 'substance'

/**
  Configurable ProseEditor component

  @example

  ```js
  const cfg = new Configurator()
  cfg.import(ProseEditorPackage)
  cfg.import(SuperscriptPackage)

  window.onload = function() {
    let doc = configurator.createArticle(fixture)
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
    let scrollPane = this.context.scrollPane
    let Overlay = this.componentRegistry.get('overlay')
    let Dropzones = this.componentRegistry.get('dropzones')

    this.overlay = new Overlay(this, {
      toolGroups: ['annotations', 'text', 'overlay']
    }).mount(scrollPane.el)

    this.dropzones = new Dropzones(this, {}).mount(scrollPane.el)
  }

  dispose() {
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
        textTypes: configurator.getTextTypes()
      }).ref('body')
    )
    return el
  }

}

export default RichTextAreaEditor
