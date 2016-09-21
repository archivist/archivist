import { ProseEditorPackage, SplitPane, ScrollPane, Layout, Overlay, ContainerEditor } from 'substance'
const ProseEditor = ProseEditorPackage.ProseEditor

class Publisher extends ProseEditor {

  render($$) {
    let el = $$('div').addClass('sc-publisher')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '400px'}).append(
        this._renderMainSection($$),
        this._renderContextSection($$)
      )
    )
    return el
  }

  _renderContextSection($$) {
    return $$('div').addClass('se-context-section').append(
      'context'
    )
  }

  _renderMainSection($$) {
    let mainSection = $$('div').addClass('se-main-section')
    let splitPane = $$(SplitPane, {splitType: 'horizontal'}).append(
      // inherited from  ProseEditor
      this._renderToolbar($$),
      this._renderContentPanel($$)
    )
    mainSection.append(splitPane)
    return mainSection
  }

  _renderContentPanel($$) {
    const doc = this.props.documentSession.getDocument()
    const configurator = this.props.configurator

    let contentPanel = $$(ScrollPane, {
      scrollbarType: 'substance',
      scrollbarPosition: 'left',
      overlay: Overlay,
    }).ref('contentPanel')

    let layout = $$(Layout, {
      width: 'large'
    })

    layout.append(
      $$(ContainerEditor, {
        disabled: this.props.disabled,
        documentSession: this.props.documentSession,
        node: doc.get('body'),
        commands: configurator.getSurfaceCommandNames(),
        textTypes: configurator.getTextTypes()
      }).ref('body')
    )

    contentPanel.append(layout)
    return contentPanel
  }

}

export default Publisher