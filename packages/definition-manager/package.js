import DefinitionsPage from './DefinitionsPage'

export default {
  name: 'definition-manager',
  configure: function(config) {
    config.addPage('definitions', DefinitionsPage)
  }
}