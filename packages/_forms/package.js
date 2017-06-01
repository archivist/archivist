import Form from './Form'

export default {
  name: 'forms',
  configure: function(config) {
    config.addComponent('form', Form)

    config.addLabel('reference-empty-value', {
      en: 'No values matching your query',
      ru: 'Ой, ничего не нашлось'
    })
    config.addLabel('reference-select', {
      en: 'Select value',
      ru: 'Выберите значение'
    })
  }
}