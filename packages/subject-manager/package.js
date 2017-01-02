import SubjectsPage from './SubjectsPage'

export default {
  name: 'subject-manager',
  configure: function(config) {
    config.addPage(SubjectsPage.pageName, SubjectsPage)

    config.addIcon('collapsed', { 'fontawesome': 'fa-caret-right' })
    config.addIcon('expanded', { 'fontawesome': 'fa-caret-down' })
    config.addIcon('dnd', { 'fontawesome': 'fa-arrows' })
  }
}