// The Subject entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async')
  , backup = require('../controllers/backup.js');

var subjectSchema = new Schema({
  	type: String
  ,	name: String
  , description: String
  , parent: String
});

subjectSchema.set('toJSON', { getters: true, virtuals: true })

var subjectShadowSchema = new Schema({}, {collection: 'subjects_backup', strict: false}),
		subjectShadow = mongoose.model('subjectShadow', subjectShadowSchema);

subjectSchema.plugin(backup, { shadow: subjectShadow });

module.exports = mongoose.model('Subject', subjectSchema);