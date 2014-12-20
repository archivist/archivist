// The Subject entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var subjectSchema = new Schema({
  	type: String
  ,	name: String
  , description: String
  , parent: String
});

subjectSchema.set('toJSON', { getters: true, virtuals: true })

 
module.exports = mongoose.model('Subject', subjectSchema);