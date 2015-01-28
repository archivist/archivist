// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async');

var documentSchema = new Schema({
  	_schema: [String]
  , nodes: Schema.Types.Mixed
});

documentSchema.set('toJSON', { getters: true, virtuals: true })

var documentShadowSchema = new Schema({}, {collection: 'documents_backup', strict: false}),
		documentShadow = mongoose.model('documentShadow', documentShadowSchema);

documentSchema.statics.backup = function(cb) {
	var self = this;

	documentShadow.find().remove(function(err, result) {
		self.find().exec(function(err, docs) {
			async.eachLimit(docs, 100, function(doc, callback) {
				var documentClone = new documentShadow(doc);
				documentClone.save(function(err){
					callback(err);
				});
			}, function(err){
		    cb(err);
			});
		});
	});
} 

documentSchema.statics.restore = function(cb) {
	var self = this;

	self.find().remove(function(err, result) {
		documentShadow.find().exec(function(err, docs) {
			async.eachLimit(docs, 100, function(doc, callback) {
				var documentClone = new self(doc);
				documentClone.save(function(err){
					callback(err);
				});
			}, function(err){
		    cb(err);
			});
		});
	});
}
 
module.exports = mongoose.model('Document', documentSchema);