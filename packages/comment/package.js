'use strict';

var Comment = require('./Comment');
var CommentTool = require('./CommentTool');
var CommentCommand = require('./CommentCommand');
var CommentComponent = require('./CommentComponent');

module.exports = {
  name: 'comment',
  configure: function(config) {
    config.addNode(Comment);
    config.addTool(Comment.type, CommentTool);
    config.addCommand(Comment.type, CommentCommand, { nodeType: Comment.type });
    config.addComponent(Comment.type, CommentComponent);
    config.addIcon(Comment.type, {'fontawesome': 'fa-comment'});
    config.addStyle(__dirname, '_comment');
  }
};