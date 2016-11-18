import PersonsPage from './PersonsPage'

export default {
  name: 'person-manager',
  configure: function(config) {
    config.addPage('persons', PersonsPage)
  }
}