var indexInterview = require('./index_interview.js');
var updateInterview = require('./update_interview.js');
var deleteInterview = require('./delete_interview.js');

module.exports = {
  create: indexInterview,
  update: updateInterview,
  remove: deleteInterview
}