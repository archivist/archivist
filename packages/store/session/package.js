import SessionStore from './SessionStore'

export default {
  name: 'session-store',
  configure: function(config) {
    config.addStore('session', SessionStore)
  }
}