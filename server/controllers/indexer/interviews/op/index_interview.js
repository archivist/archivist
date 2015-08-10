var _ = require('underscore');
var getIndexingCommands = require('./get_indexing_commands');

function indexInterview(client, interview, cb) {

  // Find all indexed fragments and remove those
  // which are not used by the interview anymore.
  client.search({
    index: 'interviews',
    type: 'fragment',
    fields: "",
    size: 20000,
    body: {
      query: {
        term: { _parent: interview.id }
      }
    }
  }, function(err, res) {
    if (err) return cb(err);
    var fragments = {};
    _.each(interview.get('content').nodes, function(id) {
      fragments[id] = true;
    });
    var removedFragments = [];
    _.each(res.hits.hits, function(hit) {
      var id = hit._id;
      if (!fragments[id]) {
        removedFragments.push(id);
      }
    });
    var removeCommands = [];
    _.each(removedFragments, function(id) {
      removeCommands.push({ delete: { _index: 'interviews', _type: 'fragment', _id: id } });
    });
    getIndexingCommands(interview, function(err, commands) {
      if (err) return cb(err);;
      commands = removeCommands.concat(commands);
      client.bulk({
        body: commands
      }, cb);
    });

  });
}

module.exports = indexInterview;
