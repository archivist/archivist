import PrisonsPage from './PrisonsPage'

export default {
  name: 'prison-manager',
  configure: function(config) {
    config.addPage('prisons', PrisonsPage)
  }
}