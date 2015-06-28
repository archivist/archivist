var _ = require('underscore')
	, Substance = require('substance')
	, utils = require('./utils.js');

var timecodesMap = [];

var annotateTimecodes = function(doc, cb) {
	var content = doc.get('content');

	// Build map to avoid duplicating of timecodes
	var timecodes = doc.getIndex('type').get('timecode');
	_.each(timecodes, function(tc){
		if(_.isUndefined(timecodesMap[tc.path[0]])) {
			timecodesMap[tc.path[0]] = [];
		}
		timecodesMap[tc.path[0]].push({
			startOffset: tc.startOffset,
			endOffset: tc.endOffset
		});
	})


	// Get first component and find timecode there
	var comp = content.getFirstComponent();
	detectTimecode(doc, comp.path);

	// Get other components and find timecode there
	while (comp.hasNext()) {
	  comp = comp.getNext();
	  detectTimecode(doc, comp.path);
	}

	cb(null, doc);
}

// Detecting timecodes, if it's not yet exists then creates it
var detectTimecode = function(doc, path) {
	var text = doc.get(path);

	// regex for detecting everything between {}
	var regex = new RegExp("\{(.+?)\}", "g")

	var timecodes = text.match(regex);

	_.each(timecodes, function(tc){
		//console.log('timecode', tc, 'has been detected');
		var startPos = text.indexOf(tc);
		var endPos = startPos + tc.length;
		var alredyExists = checkForExistingTimecode(path, startPos);
		if(!alredyExists) createTimecodeAnnotation(doc, startPos, endPos, path);
	});
}

// Checks if timecode already exists
var checkForExistingTimecode = function(path, startOffset) {
	// If there's no such node in existing timecodes map, then it's new timecode
	if(_.isUndefined(timecodesMap[path[0]])) {
		return false;
	} else {
		// If there's node inside timecodes map, then we try to find timecode using startOffset
		var exists = false;
		var filtereredTimecodes = _.filter(timecodesMap[path[0]], function(tc){ return tc.startOffset == startOffset; });
		if(!_.isEmpty(filtereredTimecodes)) exists = true;
		return exists;
	}
}

// TIMECODE EXAMPLE
// timecodefc7d6dd08bdad0b8f7adebe0144b78f0: {
//   endOffset: 9,
//   startOffset: 0,
//   path: [
//     "paragraphe8731649eaf3139c961f28c31f7a24d0",
//     "content"
//   ],
//   type: "timecode",
//   id: "timecodefc7d6dd08bdad0b8f7adebe0144b78f0"
// }


// Timecode creation via document transaction
var createTimecodeAnnotation = function(doc, startOffset, endOffset, path) {
	var tx = doc.startTransaction();
  tx.create({
    type: "timecode",
    startOffset: startOffset,
    endOffset: endOffset,
    path: path,
    id: 'timecode' + Substance.uuid()
  });
  tx.save();
  tx.cleanup();
}

module.exports = function(id, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		annotateTimecodes(interview, function(err, doc) {
			if (err) return cb(err);
			utils.saveInterview(id, doc, function(err, document) {
				if (err) return cb(err);
				cb(null, document);
			});
		})
	})
}