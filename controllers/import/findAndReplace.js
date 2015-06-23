/*
	This is goona be find and replace tool for text nodes
*/

var _ = require('underscore')
	, Substance = require('Substance')
	, utils = require('./utils.js');

var findReplaceNodes = function(doc, cb) {
	var content = doc.get('content');

	// Get first component and find timecode there
	var comp = content.getFirstComponent();
	//detectTimecode(doc, comp.path);

	// Get other components and find timecode there
	while (comp.hasNext()) {
	  comp = comp.getNext();
	  //detectTimecode(doc, comp.path);
	}

	cb(null, doc);
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