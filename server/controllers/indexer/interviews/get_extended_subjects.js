var getJSON = require('./get_json');
var config = require('../config');
var _ = require('underscore');

function getExtendedSubjects(mode, ids, cb) {
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

module.exports = getExtendedSubjects;
