
'use strict';

var Mark = require('./Mark');
var MarkTool = require('./MarkTool');
var MarkCommand = require('./MarkCommand');

module.exports = {
  name: 'mark',
  configure: function(config) {
    config.addNode(Mark);
    config.addTool(Mark.type, MarkTool);
    config.addCommand(Mark.type, MarkCommand, { nodeType: Mark.type });
    config.addIcon(Mark.type, {'fontawesome': 'fa-pencil'});
    config.addStyle(__dirname, '_mark');
  }
};