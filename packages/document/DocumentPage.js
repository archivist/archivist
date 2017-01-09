import { Component } from 'substance'

class DocumentPage extends Component {

  getChildConfigurator(name) {
    let configurator = this.context.configurator
    return configurator.getConfigurator(name)
  }

  render($$) {
    let userSession = this.props.userSession
    // let schemaName = this.props.schemaName
    let schemaName = 'archivist-interview'
    let el = $$('div').addClass('sc-document-page')

    let mode

    if(!this.props.preview && !this.props.mobile) {
      mode = 'editor'
    } else {
      mode = 'reader'
    }

    let configuratorName = [schemaName, mode].join('-')
    let configurator = this.getChildConfigurator(configuratorName)
    let childComponentRegistry = configurator.getComponentRegistry()
    let EditorComponent = childComponentRegistry.get(mode)
    
    el.append($$(EditorComponent, {
      configurator: configurator,
      documentId: this.props.documentId,
      entityId: this.props.entityId,
      userSession: userSession,
      mobile: this.props.mobile
    }).ref('editor'))

    return el
  }

}

export default DocumentPage