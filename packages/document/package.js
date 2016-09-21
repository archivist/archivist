import DocumentPage from './DocumentPage'

export default {
  name: 'archivist-document',
  configure: function(config) {
    config.addComponent('document', DocumentPage)
    config.addPage('document')
  }
}