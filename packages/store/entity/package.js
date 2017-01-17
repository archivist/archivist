import EntityStore from './EntityStore'

export default {
  name: 'entity-store',
  configure: function(config) {
    config.addStore('entity', EntityStore)
  }
}