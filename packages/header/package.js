import Header from './Header'

export default {
  name: 'archivist-header',
  configure: function(config) {
    config.addComponent('header', Header)
    config.addIcon('user-settings', {'fontawesome': 'fa-cog'})
    config.addIcon('logout', {'fontawesome': 'fa-sign-out'})
  }
}