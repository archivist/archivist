import Header from './Header'

export default {
  name: 'archivist-header',
  configure: function(config) {
    config.addComponent('header', Header)
  }
}