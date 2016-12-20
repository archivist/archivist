import Users from './Users'

export default {
  name: 'users',
  configure: function(config) {
    config.addPage('users', Users)

    config.addLabel('users', {
      en: 'Users'
    })
  }
}
