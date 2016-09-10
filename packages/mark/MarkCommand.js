'use strict';

var AnnotationCommand = require('substance/ui/AnnotationCommand');

function MarkCommand() {
  MarkCommand.super.apply(this, arguments);
}

AnnotationCommand.extend(MarkCommand);

module.exports = MarkCommand;