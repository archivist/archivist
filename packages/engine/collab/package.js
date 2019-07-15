import CollabEngine from './CollabEngine'

export default {
  name: 'collab-engine',
  configure: function(config) {
    let collabEngine = CollabEngine
    config.addEngine('collab', collabEngine)
  }
}