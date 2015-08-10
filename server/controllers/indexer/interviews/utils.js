var _ = require('underscore'),
    Tree = require('archivist-core/interview/tree');

exports.getExtendedSubjects(mode, ids, cb) {
  if (!ids || ids.length === 0) {
    return cb(null, []);
  }
  var idx = 0;
  var result = ids.slice(0);
  function step(cb) {
    if (idx >=ids.length) {
      result = _.uniq(result);
      cb(null, result);
      return;
    }
    var subjectId = ids[idx++];
    if (mode === "children") {
      getJSON(config.archive + '/api/subjects/children/'+subjectId, function(err, ids) {
        if (err) return cb(err);
        result = result.concat(ids);
        step(cb);
      });
    }
  }
  step(cb);
}

exports.getSubjectTree(cb) {
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