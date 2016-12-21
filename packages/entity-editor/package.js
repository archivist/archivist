import EntityEditor from './EntityEditor'
import FormsPackage from '../forms/package'

export default {
  name: 'entity',
  configure: function(config) {
    config.import(FormsPackage)
    config.addComponent('entity-editor', EntityEditor)
  }
}