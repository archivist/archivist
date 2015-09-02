var _ = require('underscore'),
    Subject = require('../../../models/subject'),
    Tree = require('archivist-core/interview/tree');

exports.getExtendedSubjects = function(mode, ids, cb) {
  if (!ids || ids.length === 0) {
    return cb(null, []);
  }
  var idx = 0;
  var result = ids.slice(0);
  var subjectsTree;
  function step(cb) {
    if (idx >=ids.length) {
      result = _.uniq(result);
      cb(null, result);
      return;
    }
    var subjectId = ids[idx++];
    if (mode === "children") {
      children = subjectsTree.getAllChildren(subjectId);
      result = result.concat(children);
      step(cb);
    }
  }
  Subject.listStructure(function(err, subjects) {
    subjectsTree = new Tree(subjects);
    step(cb)
  });
}

exports.getSubjectTree = function(cb) {
  Subject.listStructure(function(err, subjects) {
    var subjects = _.object(_.map(subjects, function(item) {
      return [item.id, item];
    }));
    cb(err, new Tree(subjects));
  });
}