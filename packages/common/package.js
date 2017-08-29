export default {
  name: 'comments',
  configure: function(config) {
    config.addLabel('no-results', {
      en: 'No results',
      ru: 'Нет результатов'
    })
    config.addLabel('no-results-description', {
      en: 'Sorry, no entities matches your query',
      ru: 'По вашему запросу не найдено ни одной сущности'
    })
    config.addLabel('saveComment', {
      en: 'Save',
      ru: 'Сохранить'
    })
    config.addLabel('defaultComment', {
      en: 'Write comment here',
      ru: 'Оставьте комментарий здесь'
    })
    config.addLabel('search-placeholder', {
      en: 'Search...',
      ru: 'Поиск...'
    })
    config.addLabel('delete-action', {
      en: 'Delete',
      ru: 'Удалить'
    })
    config.addLabel('merge-action', {
      en: 'Merge',
      ru: 'Слить'
    })
    config.addLabel('updated-info', {
      en: 'Updated fromnow by username',
      ru: 'Обновлено datetime, username'
    })
    config.addLabel('document-counter', {
      en: 'count documents',
      ru: 'документы: count'
    })
  }
}