// The Subject entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async');

var subjectSchema = new Schema({
  	type: String
  ,	name: String
  , description: String
  , parent: String
});

subjectSchema.set('toJSON', { getters: true, virtuals: true })

var subjectShadowSchema = new Schema({}, {collection: 'subjects_backup', strict: false}),
		subjectShadow = mongoose.model('subjectShadow', subjectShadowSchema);

subjectSchema.statics.backup = function(cb) {
	var self = this;

	subjectShadow.find().remove(function(err, result) {
		self.find().exec(function(err, subjects) {
			async.eachLimit(subjects, 100, function(subject, callback) {
				var subjectClone = new subjectShadow(subject);
				subjectClone.save(function(err){
					callback(err);
				});
			}, function(err){
		    cb(err);
			});
		});
	});
} 

subjectSchema.statics.restore = function(cb) {
	var self = this;

	self.find().remove(function(err, result) {
		subjectShadow.find().exec(function(err, subjects) {
			async.eachLimit(subjects, 100, function(subject, callback) {
				var subjectClone = new self(subject);
				subjectClone.save(function(err){
					callback(err);
				});
			}, function(err){
		    cb(err);
			});
		});
	});
}

module.exports = mongoose.model('Subject', subjectSchema);