import ChangeStore from './ChangeStore'

export default {
  name: 'change-store',
  configure: function(config) {
    config.addStore('change', ChangeStore)
  }
}