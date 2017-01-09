import DocumentPage from './DocumentPage'

export default {
  name: 'archivist-document',
  configure: function(config) {
    config.addPage('documents', DocumentPage)
  }
}