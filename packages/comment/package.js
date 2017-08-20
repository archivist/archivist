import Comment from './Comment'
import CommentTool from './CommentTool'
import CommentCommand from './CommentCommand'
import CommentComponent from './CommentComponent'

export default {
  name: 'comment',
  configure: function(config) {
    config.addNode(Comment)
    config.addTool(Comment.type, CommentTool)
    config.addCommand(Comment.type, CommentCommand, { nodeType: Comment.type, commandGroup: 'references' })
    config.addComponent(Comment.type, CommentComponent)
    config.addIcon(Comment.type, {'fontawesome': 'fa-comment'})

    config.addLabel('comment', {
      en: 'comment',
      ru: 'комментарий'
    })
  }
}