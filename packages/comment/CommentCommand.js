import { Command } from 'substance'

class CommentCommand extends Command {

  getCommandState(props, context) {
    let surface = props.surface
    let sel = props.selection
    let disabled = !surface || sel.isNull() || !sel.isPropertySelection()
    let targetType = this.getTargetType(props, context)

    return {
      targetType: targetType,
      active: targetType !== 'comment',
      disabled: disabled
    }
  }

  execute(props, context) {
    let sel = props.selection
    if (!sel.isPropertySelection()) return
    let surface = props.surface
    let targetType = this.getTargetType(props, context)
    let authenticationClient = context.authenticationClient
    let user = authenticationClient.getUser()

    if (targetType) {
      // A Surface transaction performs a sequence of document operations
      // and also considers the active selection.
      surface.transaction(function(tx, args) {
        args.data = {
          type: targetType,
          createdAt: new Date().toISOString(),
          author: user.name
        }
        return surface.switchType(tx, args)
      });
      return {status: 'ok'}
    }
  }

  getTargetType(props, context) {
    let sel = props.selection
    if (sel.isNull() || !sel.isPropertySelection()) return null
    let doc = context.doc
    let path = sel.getPath()
    let node = doc.get(path[0])
    // HACK: We should make sure the getCommandState is not called for
    // an invalid selection.
    if (!node) return 'paragraph'
    let nodeType = node.type

    if (nodeType === 'comment') {
      return 'paragraph'
    } else {
      return 'comment'
    }
  }
}

export default CommentCommand