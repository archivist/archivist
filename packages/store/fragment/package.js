import FragmentStore from './FragmentStore'

export default {
  name: 'fragment-store',
  configure: function(config) {
    config.addStore('fragment', FragmentStore)
  }
}