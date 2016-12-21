import DefinitionsPage from './DefinitionsPage'

export default {
  name: 'definition-manager',
  configure: function(config) {
    config.addPage(DefinitionsPage.pageName, DefinitionsPage)
  }
}