var async = require('async');

module.exports = function(schema, options) {
	options = options || { shadow: null };

	var shadowCollection = options.shadow;

	if(shadowCollection != null) {

		schema.statics.backup = function(cb) {
			var self = this;

			shadowCollection.find().remove(function(err, result) {
				self.find().exec(function(err, documents) {
					async.eachLimit(documents, 100, function(doc, callback) {
						var documentClone = new shadowCollection(doc);
						documentClone.save(function(err){
							callback(err);
						});
					}, function(err){
				    cb(err);
					});
				});
			});
		} 

		schema.statics.restore = function(cb) {
			var self = this;

			self.find().remove(function(err, result) {
				shadowCollection.find().exec(function(err, documents) {
					async.eachLimit(documents, 100, function(doc, callback) {
						var personClone = new self(doc);
						documentClone.save(function(err){
							callback(err);
						});
					}, function(err){
				    cb(err);
					});
				});
			});
		}

	}
}