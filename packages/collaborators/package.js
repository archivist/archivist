import Collaborators from './Collaborators'

export default {
  name: 'collaborators',
  configure: function(config) {
    config.addComponent('collaborators', Collaborators)
  }
}