import Notification from './Notification'

export default {
  name: 'archivist-notification',
  configure: function(config) {
    config.addComponent('notification', Notification)
    config.addIcon('error-msg', {'fontawesome': 'fa-exclamation-triangle'})
    config.addIcon('success-msg', {'fontawesome': 'fa-thumbs-up'})
  }
}