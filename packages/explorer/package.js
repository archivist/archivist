import Explorer from './Explorer'

export default {
  name: 'archivist-explorer',
  configure: function(config) {
    config.addPage('explorer', Explorer)
  }
}