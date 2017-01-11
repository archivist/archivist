import Brackets from './Brackets'

export default {
  name: 'brackets',
  configure: function(config) {
    config.addComponent('brackets', Brackets)
  }
}