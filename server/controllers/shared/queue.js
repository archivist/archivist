var async = require('async');
var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var ESconfig = require('../indexer/config');
var EntityIndex = require('../indexer/entities/op');
var index = process.env.INDEX || "false";

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
      cb();
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
			EntityIndex.remove(client, data.id, callback);
			break;
		case 'reindex':
			requestEntityReindex(callback);
			break;
		default:
			break;
	}
}

var requestEntityReindex = function(callback) {
	var EntitiesList = require('../api/entities.js').list;
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
      cb();
    }, function(err) {
      callback(err);
    });
  });
}

var taskHandler = function(task, callback) {
	var client = new elasticsearch.Client(_.clone(ESconfig));
	switch(task.type) {
		case 'document':
			documentHandler(client, task, callback);
			break;
		case 'entity':
			entityHandler(client, task, callback);
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
	if(index == 'false') {
		console.log("Skipping indexing request, elasticsearch isn't configured");
		return;
	}
	var self = this;
	function _push(data) {
		self.push(data, function(err){
			if(err) {
				if(data.counter) {
					data.counter += 1;
				} else {
					data.counter = 1;
				}
				if(data.counter > 10) {
					console.log('Canceling task processing after 10 attemptions');
					return;
				}
				console.log('Delaying task processing due an error');
				return _push(data);
			}
			console.log('finished task');
			console.log('tasks left:', queue.length());
		});
		console.log('Indexing request', data.op ,'added to queue')
	}
	if(task.op == 'reindex') {
		this.unshift(task, function(err){
			if(err) {
				console.log('reindex processing has been failed');
			}
			console.log('Reindex processing has been finished');
		});
	} else {
		_push(task);
	}
}

queue.drain = function() {
  console.log('All indexing tasks have been processed');
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
		return task.data.meta !== true && task.data.op !== "remove";
	});
	this.tasks = filtered;
	this.resume();
}

queue.cleanEntities = function() {
	this.cleanTasksByType('entity');
}

queue.clean = function() {
	this.tasks = [];
}

queue.requestFullReindex = function() {
	this.clean();
	this.add({type: 'entity', op: 'reindex'});
	this.add({type: 'document', op: 'reindex', meta: false});
}

queue.printStatus = function() {
	var length = queue.length();
	console.log('tasks left:', length);
	if(length > 0) {
		console.log('current task:', queue.tasks[0]);
	}
	if(length > 1) {
		console.log('next task:', queue.tasks[1]);
	}
}

module.exports = queue;