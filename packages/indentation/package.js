import IndentationCommand from './IndentationCommand'

export default {
  name: 'indentation-cleaner',
  configure: function(config) {
    config.addCommand('indentation-cleaner', IndentationCommand, { commandGroup: 'utils' })
    config.addIcon('indentation-cleaner', {'fontawesome': 'fa-dedent'})

    config.addLabel('indentation-cleaner', {
      en: 'clean indentation',
      ru: 'очитстить отступы'
    })
  }
}