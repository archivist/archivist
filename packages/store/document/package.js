import DocumentStore from './DocumentStore'

export default {
  name: 'document-store',
  configure: function(config) {
    config.addStore('document', DocumentStore)
  }
}