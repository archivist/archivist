//import Forms from './Forms'
import NodeForm from './NodeForm'

export default {
  name: 'forms',
  configure: function(config) {
    //config.addComponent('forms', Forms)
    config.addComponent('form', NodeForm)
  }
}