import { TextBlock } from 'substance'

class Comment extends TextBlock {}

Comment.define({
  type: 'comment',
  content: 'text',
  author: { type: 'string', default: '' },
  createdAt: { type: 'string', default: new Date().toISOString() }
})

export default Comment