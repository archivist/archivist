var _ = require('underscore')
	, async = require('async')
	, request = require('superagent')
	, Remark = require('./remarks')
	, Substance = require('substance')
	, utils = require('./utils.js');

var indexerUrl = "http://ost-index.d4s.io/search/document";
var SPId;//"16";
var docId;//"5587f3485c8e9e4a10773fde";
var tableId = 'oqthas0';
var entitiesMap = [];
var timecodesMap = {};
var documentContent;
var found = {};
var report = [];

var annotatePersons = function(doc, cb) {
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

	var timecodes = doc.getIndex('type').get('timecode');
	_.each(timecodes, function(tc){
		code = tc.getText();
		timecodesMap[code] = tc;
	})

	documentContent = doc.get('content');

	utils.loadSPPersons(SPId, function(err, persons){
		if (err) return cb(err);
		async.eachSeries(persons, function(person, callback){
			if(!_.isNull(person.timecodes)){
				async.eachSeries(person.timecodes, function(timecodes, cb){
					var components = [];
					if(_.isUndefined(timecodesMap[timecodes[0]])) timecodes[0] = timecodes[0].slice(0, 1) + timecodes[0].slice(2, timecodes[0].length)
					var openCode = timecodesMap[timecodes[0]];
					if(_.isUndefined(timecodesMap[timecodes[1]])) timecodes[1] = timecodes[1].slice(0, 1) + timecodes[1].slice(2, timecodes[1].length)
					var closeCode = timecodesMap[timecodes[1]];
					if(_.isUndefined(openCode)) console.log(timecodes)
					var openCodeComp = documentContent.getComponent(openCode.path);
					var closeCodeComp = documentContent.getComponent(closeCode.path);
					var comp = openCodeComp;
					components.push(comp.rootId);

					while(comp.hasNext()) {
						var comp = comp.getNext();
						components.push(comp.rootId);
						if(comp.rootId == closeCodeComp.rootId) break;
					}

					findPersons(person, doc, components, false, timecodes, cb);
				},
				function(err){
					if (err) return callback(err);
					callback();
				});
			} else {
				var components = [];
				findPersons(person, doc, components, true, [], callback);
			}
		}, function(err){
			if (err) return cb(err);
			Remark.writeOutPersonsReport(doc, report, timecodesMap, 	'В этом промежутке затерялись персоналии:');
			console.log('Done! Yay!')
			cb(null, doc, found);
		});
	});
}

// Querying indexer for each person
var findPersons = function(person, doc, components, global, timecodes, cb){
	var synonyms = person.values;
	var reportIndex = report.push({person: person, timecodes: timecodes, found: false}) - 1;
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
		  	if(err) {
		  		return callback(err);
		  	}
		    var fragments = res.body.fragments;
		  	async.each(fragments, function(fragment, cb) {
		  		// Detect person inside search result and annotate it
		  		if(global) {
		  			detectPerson(fragment, doc, person, synonym, reportIndex, cb);
		  		} else {
			  		if(_.contains(components, fragment.id)) { 
			  			detectPerson(fragment, doc, person, synonym, reportIndex, cb);
			  		} else {
			  			cb();
			  		}
			  	}
		  	}, function(err){
					if (err) return callback(err);
					callback();
				});
		  });
	}, function(err){
		if (err) return cb(err);
		cb();
		//console.log('Anotating of', topo.id, 'has been finished.')
	});
}

var detectPerson = function(fragment, doc, person, synonym, index, cb) {
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
		if(report[index].found == false) report[index].found = true;
		//console.log('timecode', tc, 'has been detected');
		var startPos = textNode.indexOf(entity);
		// start position and match length, subtract <span class="query-string"></span> length
		var endPos = startPos + entity.length;

		var alredyExists = checkForExistingAnnotation(person.id, startPos);

		if(!alredyExists) {
			// Store data to send back to google spreadheet
			if(person.found) {
				found[person.row] = {9: person.found + '; ' + SPId}
			} else {
				found[person.row] = {9: SPId}
			}
			// create annotation via transaction interface
			createEntityAnnotation(doc, startPos, endPos, path, person.id);
		}
	});
	cb();
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

module.exports = function(id, internalId, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		docId = id;
		SPId = internalId;
		annotatePersons(interview, function(err, doc, SPdata) {
			if (err) return cb(err);
			utils.saveSPData(tableId, SPdata, function(err){
				if (err) return cb(err);
				utils.saveInterview(id, doc, function(err, document) {
					if (err) return cb(err);
					cb(null, report);
				});
			})
		})
	})
}