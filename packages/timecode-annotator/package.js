import TimecodeAnnotatorCommand from './TimecodeAnnotatorCommand'

export default {
  name: 'timecode-annotator',
  configure: function(config) {
    config.addCommand('timecode-annotator', TimecodeAnnotatorCommand, { commandGroup: 'utils' })
    config.addIcon('timecode-annotator', {'fontawesome': 'fa-history'})

    config.addLabel('timecode-annotator', {
      en: 'annotate timecodes',
      ru: 'выделить таймкоды'
    })
  }
}