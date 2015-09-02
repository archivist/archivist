var _ = require('underscore')
	, async = require('async')
	, Substance = require('archivist-core').Substance
	, Document = Substance.Document
	, utils = require('./utils.js');


// Set target as js property, because of data curruption
var updateAnnotationTarget = function(doc, id, target) {
	var subjectRef = doc.get(id);
	subjectRef.properties.target = target;
}

var removeAnnotation = function(doc, id) {
	var tx = doc.startTransaction();
	tx.delete(id);
	tx.save();
  tx.cleanup();
}

var removeTimecode = function(doc, path, startOffset, endOffset) {
	var sel = Document.Selection.create(path, startOffset+1, endOffset);
	var annos = doc.getAnnotationsForSelection(sel);
	_.each(annos, function(anno){
		if(anno.type == 'timecode') {
			console.log(anno.type, anno.id);
			removeAnnotation(doc, anno.id);
		}
	})
	removeText(doc, path, startOffset, endOffset);
}

var removeText = function(doc, path, startOffset, endOffset) {
	var tx = doc.startTransaction();
	tx.update(path, { 
		delete: { 
			start: startOffset, 
			end: endOffset 
		} 
	});
	Document.AnnotationUpdates.deletedText(tx, path, startOffset, endOffset);
	tx.save();
  tx.cleanup();
}

var detectClosingTimecode = function(doc, path) {
	var regex = new RegExp("\-{(.+?)\}", "g");
	var text = doc.get(path);
	var found = text.match(regex);

	while(!_.isNull(found)) {
		var startOffset = detectString(text, found[0]);
		var endOffset = startOffset + found[0].length;
		
		removeTimecode(doc, path, startOffset, endOffset);
		// Update text variable to detect next fragment inside node
		text = doc.get(path);
		found = text.match(regex);
	}
}

// Detect string to replace
var detectString = function(text, string) {
	return text.indexOf(string);
}

var detectEntityOverlap = function(doc, path) {
	var startOffset = 0;
	var endOffset = doc.get(path).length;
	var sel = Document.Selection.create(path, startOffset, endOffset);
	var annos = doc.getAnnotationsForSelection(sel);
	var entity_references = {};
	var duplicates = [];

	_.each(annos, function(anno){
		if(anno.type == 'entity_reference') {
			if(_.isUndefined(entity_references[anno.target])) entity_references[anno.target] = [];
			entity_references[anno.target].push([anno.startOffset, anno.endOffset, anno.id]);
		}
	})
	_.each(entity_references, function(entity, entityId){
		_.each(entity, function(anno, id){
			if(!_.contains(duplicates, anno[2])) {
				var duplications = findOverlap(anno, entity);
				duplicates = _.union(duplicates, duplications);
			}
		});
	});
	_.each(duplicates, function(entity) {
		removeAnnotation(doc, entity);
	});
}

var findOverlap = function(rootAnno, entity) {
	var duplicates = [];
	_.each(entity, function(anno){
		if(anno[2] != rootAnno[2] && !_.contains(duplicates, anno[2])) {
			if(anno[0]>=rootAnno[0] && anno[1]<=rootAnno[1]) duplicates.push(anno[2])
		}
	});
	return duplicates;
}




// Unique subject targets
var uniqueTargets = function(doc, cb) {
	var subjects = doc.getIndex('type').get('subject_reference');
	_.each(subjects, function(anno){
		var target = _.uniq(anno.target);
		if(target.length != anno.target.length) {
			console.log('subject target duplication has been found');
			updateAnnotationTarget(doc, anno.id, target);
		}
	})

	cb(null, doc);
}

// Find and remove all closing timecodes, like this -{00:00:00}
var findClosingTimecodes = function(doc, cb) {
	var content = doc.get('content');

	// Get first component and find timecode there
	var comp = content.getFirstComponent();
	detectClosingTimecode(doc, comp.path);

	// Get other components and find timecode there
	while (comp.hasNext()) {
	  comp = comp.getNext();
	  detectClosingTimecode(doc, comp.path);
	}

	cb(null, doc);
}

var removeEntityOverlap = function(doc, cb) {
	var content = doc.get('content');

	// Get first component and find timecode there
	var comp = content.getFirstComponent();
	detectEntityOverlap(doc, comp.path);

	// Get other components and find timecode there
	while (comp.hasNext()) {
	  comp = comp.getNext();
	  detectEntityOverlap(doc, comp.path);
	}

	cb(null, doc);
}

var removeShortEntities = function(doc, cb) {
	var entities = doc.getIndex('type').get('entity_reference');

	_.each(entities, function(anno){
		if((anno.endOffset - anno.startOffset < 2) && (anno.type == "entity_reference")) {
			console.log('too small entity annotation found');
			removeAnnotation(doc, anno.id);
		}
	})

	cb(null, doc);
}


var postProcess = function(doc, cb) {
	console.log('Starting post-processing...');
	async.series([
    function(callback){
    	console.log('Running entity overlap cleaner...');
			removeEntityOverlap(doc, callback);
    },
    function(callback){
    	console.log('Running short entity cleaner...');
			removeShortEntities(doc, callback);
    },
    function(callback){
    	console.log('Running subjects data corruption cleaner...');
			uniqueTargets(doc, callback);
    },
    function(callback){
    	console.log('Running closing timecodes cleaner...');
			findClosingTimecodes(doc, callback);
		}
	],
  // optional callback
  function(err, results){
		cb(err, doc)	
	});
}

module.exports = function(id, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		postProcess(interview, function(err, doc) {
			utils.saveInterview(id, doc, function(err, document) {
				if (err) return cb(err);
				cb(null, document);
			});
		})
	})
}