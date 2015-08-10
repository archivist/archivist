var _ = require('underscore');
var request = require('superagent');
var config = require('../config');
var Tree = require('archivist-core/interview/tree');

function getSubjectTree(cb) {
  request
    .get(config.archive + '/api/subjects')
    .end(function(err, res){
      if(err) console.error(err);
      var subjects = _.object(_.map(res.body.subjects, function(item) {
        return [item.id, item];
      }));
      cb(err, new Tree(subjects));
    });
}

module.exports = getSubjectTree;
