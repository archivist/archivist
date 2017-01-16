import Explorer from './Explorer'
import SearchBar from './SearchBar'
import DocumentItem from './DocumentItem'

export default {
  name: 'archivist-explorer',
  configure: function(config) {
    config.addPage('explorer', Explorer)
    config.addComponent('searchbar', SearchBar)
    config.addComponent('document-item', DocumentItem)
    config.addIcon('searchbar-search', {'fontawesome': 'fa-search'})
    config.addIcon('fragment-badge', {'fontawesome': 'fa-comments-o'})
    config.addIcon('video', {'fontawesome': 'fa-video-camera'})
    config.addIcon('audio', {'fontawesome': 'fa-volume-up'})
    config.addLabel('searchbar-placeholder', {
      en: 'Enter search query',
      ru: 'Введите поисковой запрос'
    })
    config.addLabel('searchbar-submit', {
      en: 'Search',
      ru: 'Поиск'
    })
    config.addLabel('no-results', {
      en: 'No results',
      ru: 'Нет результатов'
    })
    config.addLabel('no-results-info', {
      en: 'Sorry, no documents matches your query',
      ru: 'К сожалению, нам не удалось найти документов отвечающих данному запросу'
    })
    config.addLabel('min-duration', {
      en: 'min',
      ru: 'мин'
    })
    config.addLabel('fragment-count', {
      en: 'fragments',
      ru: 'фрагм.'
    })
  }
}