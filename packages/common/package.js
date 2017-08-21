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
  }
}