import WhitespaceCommand from './WhitespaceCommand'

export default {
  name: 'whitespace-cleaner',
  configure: function(config) {
    config.addCommand('whitespace-cleaner', WhitespaceCommand, { commandGroup: 'utils' })
    config.addIcon('whitespace-cleaner', {'fontawesome': 'fa-eraser'})

    config.addLabel('whitespace-cleaner', {
      en: 'Clean double whitespaces',
      ru: 'Очистить двойные пробелы'
    })
  }
}