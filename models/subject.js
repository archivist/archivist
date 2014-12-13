// The Subject entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var subjectSchema = new Schema({
    id: String
  ,	type: String
  ,	name: String
  , parent: String
});
 
module.exports = mongoose.model('Subject', subjectSchema);