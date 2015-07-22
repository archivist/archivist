var async = require('async')
	,	_ = require('underscore');

module.exports = function(schema, options) {
	options = options || { shadow: null };

	var shadowCollection = options.shadow;

	if(shadowCollection != null && options.fullbackup) {

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

	} else if (shadowCollection != null && !options.fullbackup) {
		schema.statics.backup = function(cb) {
			var self = this;

			console.log('Starting backup creation...');

			var docsMap = {},
					shadowMap = {},
					changed = [];

			async.parallel([
		    function(callback){
	        self.find({}, 'id __v', function(err, docs) {
				    if(err) return callback(err);
				    _.each(docs, function(doc){
				    	docsMap[doc._id] = doc.__v;
				    });
				    callback(null);
				  });
		    },
		    function(callback){
	        shadowCollection.find({}, 'id __v', function(err, docs) {
				    if(err) return callback(err);
				    _.each(docs, function(doc){
				    	doc = doc.toJSON();
				    	shadowMap[doc._id] = doc.__v;
				    });
				    callback(null);
				  });
		    }
			],
			function(err){
				if(err) return cb(err);
				_.each(docsMap, function(doc, id){
					if(!_.isUndefined(shadowMap[id])) {
						if(doc != shadowMap[id]) changed.push(id);
					} else {
						changed.push(id);
					}
				});
				_.each(shadowMap, function(doc, id){
					if(_.isUndefined(docsMap[id])) {
						changed.push(id);
					}
				});

				console.log('Followoing documents has been changed or created:', changed.join(', '));

				shadowCollection.remove({_id: {$in: changed}}, function(err){
					if(err) return cb(err);
					self.find({_id: {$in: changed}}).exec(function(err, documents) {
						if(err) return cb(err);
						async.eachLimit(documents, 100, function(doc, callback) {
							var documentClone = new shadowCollection(doc);
							documentClone.save(function(err){
								callback(err);
							});
						}, function(err){
							if(err) console.log(err)
							console.log('Backup has been created...');
					    cb(err);
						});
					});
				});
			});
		} 

		schema.statics.restore = function(cb) {
			var self = this;

			self.find().remove(function(err, result) {
				shadowCollection.find().exec(function(err, documents) {
					async.eachLimit(documents, 100, function(doc, callback) {
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
	}
}