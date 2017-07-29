import CommentContext from './CommentContext'

export default {
  name: 'comments',
  configure: function(config) {
    config.addContext('comments', CommentContext, false)
    config.addIcon('comments', {'fontawesome': 'fa-comments'})
    config.addIcon('saveChanges', {'fontawesome': 'fa-save'})
    config.addLabel('comments', {
      en: 'Comments',
      ru: 'Комментарии'
    })
    config.addLabel('goBackToComments', {
      en: 'Comments',
      ru: 'К списку'
    })
    config.addLabel('saveComment', {
      en: 'Save',
      ru: 'Сохранить'
    })
    config.addLabel('defaultComment', {
      en: 'Write comment here',
      ru: 'Оставьте комментарий здесь'
    })
  }
}