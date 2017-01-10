import { Component } from 'substance'
import extend from 'lodash/extend'

class DocumentPage extends Component {

  getChildConfigurator(name) {
    let configurator = this.context.configurator
    return configurator.getConfigurator(name)
  }

  render($$) {
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

    let props = extend({}, this.props, {configurator: configurator})
    
    el.append($$(EditorComponent, props).ref('editor'))

    return el
  }

}

export default DocumentPage