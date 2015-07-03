/*
	Find and replace tool for text nodes
*/

var _ = require('underscore')
	, Substance = require('substance')
	, Document = Substance.Document
	, utils = require('./utils.js');

var findReplaceNodes = function(doc, string, replace, cb) {
	var content = doc.get('content');

	// Get first component and find timecode there
	var comp = content.getFirstComponent();
	findString(doc, comp.path, string, replace);

	// Get other components and find timecode there
	while (comp.hasNext()) {
	  comp = comp.getNext();
	  findString(doc, comp.path, string, replace);
	}

	cb(null, doc);
}

// Find string to replace
var findString = function(doc, path, string, replace) {
	var text = doc.get(path);

	while(detectString(text, string) !== -1) {
		var startOffset = detectString(text, string);
		var endOffset = startOffset + string.length;
		changeTextNode(doc, path, startOffset, endOffset, replace);
		// Update text variable to detect next fragment inside node
		text = doc.get(path);
	}
}

// Detect string to replace
var detectString = function(text, string) {
	return text.indexOf(string);
}

var changeTextNode = function(doc, path, startOffset, endOffset, replace) {
	var sel = Document.Selection.create(path, startOffset, replace.length);
  var range = sel.getRange();
	var tx = doc.startTransaction();
	tx.update(path, { 
		delete: { 
			start: startOffset, 
			end: endOffset 
		} 
	});
	Document.AnnotationUpdates.deletedText(tx, path, startOffset, endOffset);
	tx.update(path, { 
		insert: { 
			offset: startOffset, 
			value: replace
		} 
	});
	Document.AnnotationUpdates.insertedText(tx, range.start, replace.length);
	tx.save();
  tx.cleanup();
}

module.exports = function(id, string, replace, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		findReplaceNodes(interview, string, replace, function(err, doc) {
			if (err) return cb(err);
			utils.saveInterview(id, doc, function(err, document) {
				if (err) return cb(err);
				cb(null, document);
			});
		})
	})
}