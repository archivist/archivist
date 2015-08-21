var async = require('async');
var index = process.env.INDEX || false;
var EntityIndex = require('../indexer/entities/op');
var EntitiesList = require('../api/entities.js').list;
var elasticsearch = require('elasticsearch');
var ESconfig = require('../indexer/config');

// task object: {type: 'document', op: 'index', id: '', record: {}, meta: false}

var documentHandler = function(client, data, callback) {
	var Document = require('../../models/document.js');
	switch(data.op) {
		case 'add':
			Document.addToIndex(client, data.id, callback);
			break;
		case 'update':
			Document.updateIndex(client, data.id, false, callback);
			break;
		case 'remove':
			Document.removeFromIndex(client, data.id, callback);
			break;
		case 'reindex':
			requestDocumentReindex(data.meta, callback);
			break;
		default:
			break;
	}
}

var requestDocumentReindex = function(meta, callback) {
	var Document = require('../../models/document.js');
	if(!meta) {
		queue.cleanDocumentsTasks();
	} else {
		queue.cleanMetaDocumentsTasks();
	}
	Document.list({}, function(err, records) {
    if (err) return callback(err);
    var docs = records[1];
    async.each(docs, function(doc, cb) {
      var task = {
      	type: 'document',
      	op: 'update',
      	id: doc._id,
      	meta: meta
      }
      queue.add(task);
    }, function(err) {
      callback(err);
    });
  });
}


var entityHandler = function(client, data, callback) {
	switch(data.op) {
		case 'add':
			EntityIndex.index(client, data.record, false, callback);
			break;
		case 'update':
			EntityIndex.index(client, data.record, true, callback);
			break;
		case 'remove':
			EntityIndex.index(client, data.id, callback);
			break;
		case 'reindex':
			requestEntityReindex(callback);
			break;
		default:
			break;
	}
}

var requestEntityReindex = function(callback) {
	queue.cleanEntities();
	EntitiesList({}, function(err, records){
    if (err) return callback(err);
    var entities = records[1];
    async.each(entities, function(entity, cb) {
      var task = {
      	type: 'entity',
      	op: 'update',
      	id: entity._id,
      	record: entity
      }
      queue.add(task);
    }, function(err) {
      callback(err);
    });
  });
}

var taskHandler = function(task, callback) {
	var client = new elasticsearch.Client(_.clone(ESconfig));
	switch(task.data.type) {
		case 'document':
			documentHandler(client, task.data, callback);
			break;
		case 'entity':
			entityHandler(client, task.data, callback);
			break;
		default:
			break;
	}
}

var queue = async.queue(taskHandler);

/** 
 * Add task to queue
 * If index is turned off, then it will do nothing
 */

queue.add = function(task) {
	if(!index) return;
	var self = this;
	function _push(data) {
		self.push(data, function(err){
			if(err) return _push(data);
			console.log('finished task');
		});
	}
	_push(task);
}

queue.drain = function() {
  console.log('all tasks have been processed');
}

queue.cleanTasksByType = function(type) {
	this.pause();
	var filtered = this.tasks.filter(function(task){
		return task.data.type != type;
	});
	this.tasks = filtered;
	this.resume();
}

queue.cleanDocumentsTasks = function() {
	this.cleanTasksByType('document');
}

queue.cleanMetaDocumentsTasks = function() {
	this.pause();
	var filtered = this.tasks.filter(function(task){
		return task.data.meta !== true;
	});
	this.tasks = filtered;
	this.resume();
}

queue.cleanEntities = function() {
	this.cleanTasksByType('entity');
}

module.exports = queue;