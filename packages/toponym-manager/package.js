import ToponymsPage from './ToponymsPage'

export default {
  name: 'toponym-manager',
  configure: function(config) {
    config.addPage(ToponymsPage.pageName, ToponymsPage)
  }
}