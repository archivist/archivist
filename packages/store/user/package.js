import UserStore from './UserStore'

export default {
  name: 'user-store',
  configure: function(config) {
    config.addStore('user', UserStore)
  }
}