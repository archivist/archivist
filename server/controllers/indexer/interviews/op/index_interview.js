var _ = require('underscore');
var getIndexingCommands = require('../get_indexing_commands');

function indexInterview(client, interview, cb) {
  getIndexingCommands(interview, function(err, commands) {
    if (err) return cb(err);;
    client.bulk({
      body: commands
    }, cb);
  });
}

module.exports = indexInterview;