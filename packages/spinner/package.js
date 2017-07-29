import Spinner from './Spinner'

export default {
  name: 'archivist-spinner',
  configure: function(config) {
    config.addComponent('spinner', Spinner)
    config.addLabel('spinner-loading', {
      en: 'Loading...',
      ru: 'Загрузка...'
    })
  }
}