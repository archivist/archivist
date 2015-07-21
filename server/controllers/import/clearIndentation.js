/*
	Clear indetation of text nodes
*/

var _ = require('underscore')
	, Substance = require('archivist-core').Substance
	, Document = Substance.Document
	, utils = require('./utils.js');

var findReplaceNodes = function(doc, cb) {
	var content = doc.get('content');

	// Get first component and find timecode there
	var comp = content.getFirstComponent();
	findString(doc, comp.path);

	// Get other components and find timecode there
	while (comp.hasNext()) {
	  comp = comp.getNext();
	  findString(doc, comp.path);
	}

	cb(null, doc);
}

// Find string to replace
var findString = function(doc, path) {
	var text = doc.get(path);
	var string = ' ';

	while(detectString(text, string) == 0) {
		var startOffset = detectString(text, string);
		var endOffset = startOffset + string.length;
		changeTextNode(doc, path, startOffset, endOffset);
		// Update text variable to detect next fragment inside node
		text = doc.get(path);
	}
}

// Detect string to replace
var detectString = function(text, string) {
	return text.indexOf(string);
}

var changeTextNode = function(doc, path, startOffset, endOffset) {
	//var sel = Document.Selection.create(path, startOffset, endOffset);
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

module.exports = function(id, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		findReplaceNodes(interview, function(err, doc) {
			if (err) return cb(err);
			utils.saveInterview(id, doc, function(err, document) {
				if (err) return cb(err);
				cb(null, document);
			});
		})
	})
}