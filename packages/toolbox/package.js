import Toolbox from './Toolbox'

export default {
  name: 'archivist-toolbox',
  configure: function(config) {
    config.addComponent('toolbox', Toolbox)
  }
}