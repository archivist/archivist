import Pager from './Pager'

export default {
  name: 'pager',
  configure: function(config) {
    config.addComponent('pager', Pager)

    config.addLabel('load-more', {
      en: 'Load more',
      ru: 'Загрузить еще'
    })
  }
}
