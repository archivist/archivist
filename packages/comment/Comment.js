'use strict';

var TextBlock = require('substance/model/TextBlock');

/**
  Comment node for inline commenting
*/

function Comment() {
  Comment.super.apply(this, arguments);
}

TextBlock.extend(Comment);

Comment.define({
  type: 'comment',
  content: 'text',
  author: { type: 'string', default: '' },
  createdAt: { type: 'string', default: new Date().toISOString() }
});

module.exports = Comment;