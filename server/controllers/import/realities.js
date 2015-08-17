var _ = require('underscore')
	, async = require('async')
	, request = require('superagent')
	, Definition = require('../../models/definition.js')
	, Remark = require('./remarks')
	, Substance = require('archivist-core').Substance
	, utils = require('./utils.js');

var indexerUrl = "http://ost-index.d4s.io/search/document";
var SPId;//"16";
var docId;//"5587f3485c8e9e4a10773fde";
var tableId; // 'ow0uer7';//o4yren4
var entitiesMap = [];
var found = {};

var annotateDefinitions = function(doc, cb) {
	var entities = doc.getIndex('type').get('entity_reference');
	_.each(entities, function(entity){
		if(_.isUndefined(entitiesMap[entity.target])) {
			entitiesMap[entity.target] = [];
		}
		entitiesMap[entity.target].push({
			startOffset: entity.startOffset,
			endOffset: entity.endOffset
		});
	})

	utils.loadSPRealities(SPId, tableId, function(err, realities){
		if (err) return cb(err);
		async.eachSeries(realities, function(reality, callback){
			Definition.getRecord(reality.id, function(err, definition) {
    		if (err) return cb(err);
    		if(_.isNull(definition)) console.log(reality)
    		reality.synonyms = definition.synonyms;
    		findRealities(reality, doc, callback);
  		});
		}, function(err){
			if (err) return cb(err);
			console.log('Done! Yay!')
			Remark.writeOutEntityReport(doc, found, realities, '\nСписок потерянных дефиниций:');
			cb(null, doc, found);
		});
	});
}

// Querying indexer for each synonym
var findRealities = function(reality, doc, cb){
	//console.log('Starting to search for toponym', topo.id, 'synonyms...')
	var synonyms = reality.synonyms;
	async.each(synonyms, function(synonym, callback){
		var data = {
			searchString: synonym,
			documentId: docId,
			from: 0,
			size: 100
		}
		if (/\s/.test(synonym) || /\-/.test(synonym)) data.type = "phrase";
		request
  		.get(indexerUrl)
  		.query(data)
		  .end(function(err, res){
		  	if(err) return callback(err);
		    var fragments = res.body.fragments;
		  	_.each(fragments, function(fragment) {
		  		// Detect toponym inside search result and annotate it 
		  		detectReality(fragment, doc, reality, synonym);
		  	});
		  	callback();
		  });
	}, function(err){
		if (err) return cb(err);
		cb();
		//console.log('Anotating of', topo.id, 'has been finished.')
	});
}

var detectReality = function(fragment, doc, reality, synonym) {
	var path = [fragment.id, 'content'];
	var text = fragment.content;
	var textNode = doc.get(fragment.id).content;

	// regex for detecting everything between <span class="query-string"> and </span>
	var regex = new RegExp('\<span class="query-string">(.+?)\</span>', 'g');

	try {
		var entities = text.match(regex).map(function(val){
	  	return val.replace(/<\/?span>/g,'').replace(/<span class="query-string">/g,'');
		});
	} catch (e) {
		var entities = [];
		if(text.indexOf(synonym) !== -1) entities.push(synonym);
	}

	_.each(entities, function(entity){
		//console.log('timecode', tc, 'has been detected');
		var startPos = textNode.indexOf(entity);
		// start position and match length, subtract <span class="query-string"></span> length
		var endPos = startPos + entity.length;
		var alredyExists = checkForExistingAnnotation(reality.id, startPos);
		if(!alredyExists) {
			// Store data to send back to google spreadheet
  		if(reality.found) {
  			found[reality.row] = {7: reality.found + '; ' + SPId}
  		} else {
  			found[reality.row] = {7: SPId}
  		}
  		// create annotation via transaction interface
			createEntityAnnotation(doc, startPos, endPos, path, reality.id);
		}
	});
}

// Checks if entity already exists
var checkForExistingAnnotation = function(target, startOffset) {
	// If there's no such target in existing entities map, then it's new annotation
	if(_.isUndefined(entitiesMap[target])) {
		return false;
	} else {
		// If there's target inside entities map, then we try to find annotation using startOffset
		var exists = false;
		var filtereredEntities = _.filter(entitiesMap[target], function(entity){ return entity.startOffset == startOffset; });
		if(!_.isEmpty(filtereredEntities)) exists = true;
		return exists;
	}
}

// ENTITY EXAMPLE
// entity_reference_200114abfd88d24c1b62e1a018e89c86: {
// 	type: "entity_reference",
// 	target: "5567988cbf71410c00458f6c",
// 	path: [
// 		"text2fe22cc616ab6d60634db5f3e789a9e2",
// 		"content"
// 	],
// 	startOffset: 183,
// 	endOffset: 192,
// 	id: "entity_reference_200114abfd88d24c1b62e1a018e89c86"
// }


// Entity annotation creation via document transaction
var createEntityAnnotation = function(doc, startOffset, endOffset, path, target) {
	var tx = doc.startTransaction();
  tx.create({
    type: "entity_reference",
    target: target,
    startOffset: startOffset,
    endOffset: endOffset,
    path: path,
    id: 'entity_reference_' + Substance.uuid()
  });
  tx.save();
  tx.cleanup();
}

module.exports = function(id, internalId, GSTableId, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		docId = id;
		SPId = internalId;
		tableId = GSTableId;
		annotateDefinitions(interview, function(err, doc, SPdata) {
			if (err) return cb(err);
			utils.saveSPData(tableId, SPdata, function(err){
				if (err) return cb(err);
				utils.saveInterview(id, doc, function(err, document) {
					if (err) return cb(err);
					cb(null, document);
				});
			})
		})
	})
}