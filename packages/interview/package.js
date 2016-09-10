'use strict';

var Interview = require('./Interview');
var MetaNode = require('./MetaNode');
var InterviewSeed = require('./InterviewSeed');

var ParagraphPackage = require('substance/packages/paragraph/ParagraphPackage');
var HeadingPackage = require('substance/packages/heading/HeadingPackage');
var BlockquotePackage = require('substance/packages/blockquote/BlockquotePackage');
var ListPackage = require('substance/packages/list/ListPackage');
var LinkPackage = require('substance/packages/link/LinkPackage');
var EmphasisPackage = require('substance/packages/emphasis/EmphasisPackage');
var StrongPackage = require('substance/packages/strong/StrongPackage');

var CommentPackage = require('../comment/package');
var MarkPackage = require('../mark/package');

module.exports = {
  name: 'archivist-interview',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-interview',
      ArticleClass: Interview,
      defaultTextType: 'paragraph'
    });
    config.addNode(MetaNode);
    config.addSeed(InterviewSeed);

    // Import Substance Core packages
    config.import(ParagraphPackage);
    config.import(HeadingPackage);
    config.import(BlockquotePackage);
    config.import(ListPackage);
    config.import(EmphasisPackage);
    config.import(StrongPackage);
    config.import(LinkPackage);

    // Import note specific packages
    config.import(CommentPackage);
    config.import(MarkPackage);
  }
};