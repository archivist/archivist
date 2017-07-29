import { ContainerAnnotation } from 'substance'

/**
  Comment Node.
  Used for keeping comment annotations.
*/

class Comment extends ContainerAnnotation {}

Comment.define({
  type: 'comment',
  content: { type: 'string', default: '' },
  author: { type: 'string', default: 'Anonymous' },
  createdAt: { type: 'string', default: new Date().toISOString() },
  replies: {type: ["string"], default: []}
})

export default Comment
