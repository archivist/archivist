var _ = require('underscore')
	, async = require('async')
	, request = require('superagent')
	, Location = require('../../models/location.js')
	, Substance = require('substance')
	, utils = require('./utils.js');

var SPId;
var SPColumnId;
var docId;

var annotateSubjects = function(doc, cb) {
	var timecodesMap = {};
  var timecodes = doc.getIndex('type').get('timecode');
  var interviewContent = doc.get('content');
	_.each(timecodes, function(code, id){
    var content = doc.get(code.path);
    var timecode = content.substr(code.startOffset, 10);

    timecodesMap[timecode] = code;
  })

	utils.loadSPSubjects(SPColumnId, SPId, function(err, subjectsMap){
		if (err) return cb(err);
		var codes = {};
    _.each(subjectsMap, function(path, subject) {
      _.each(path, function(subjectCodes){
        if(_.isUndefined(codes[subjectCodes])) {
          codes[subjectCodes] = [];
          codes[subjectCodes].push(subject);
        } else {
          codes[subjectCodes].push(subject);
        }
      });
    });
    _.each(codes, function(subjects, code){
    	createSubjects(doc, interviewContent, timecodesMap, subjects, code)
    })
    cb(null, doc);
	});
}

var createSubjects = function(doc, interviewContent, timecodesMap, subjects, code){
	var subjectCodes = code.split(',');
	if(subjectCodes.length > 1) {
		var endPath = timecodesMap[subjectCodes[1]].path;
		var endOffset = timecodesMap[subjectCodes[1]].startOffset;
		var startPath = timecodesMap[subjectCodes[0]].path;
    var startOffset = timecodesMap[subjectCodes[0]].startOffset;

    // Subject selection end correction
		if(timecodesMap[subjectCodes[1]].startOffset < 4) {
			var prev = interviewContent.getComponent(endPath).getPrevious();
			var endPath = prev.path;
			var endOffset = doc.get(prev.path).length;
		}

		createSubjectAnnotation(doc, startPath, startOffset, endPath, endOffset, subjects);
	} else {
    console.log('Some problems discovered, subject: #', code, ', code: ', subjectCodes);
  }
}

// Subject annotation creation via document transaction
var createSubjectAnnotation = function(doc, startPath, startOffset, endPath, endOffset, target) {
	var tx = doc.startTransaction();
	tx.create({
    type: "subject_reference",
    startPath: startPath,
    startOffset: startOffset,
    target: target,
    container: "content",
    id: 'subject_reference_' + Substance.uuid(),
    endPath: endPath,
    endOffset: endOffset
  })
  tx.save()
  tx.cleanup()
}

module.exports = function(id, internalId, columnId, cb) {
	utils.loadInterview(id, function(err, interview) {
		if (err) return cb(err);
		docId = id;
		SPId = internalId;
		SPColumnId = columnId;
		annotateSubjects(interview, function(err, doc, SPdata) {
			if (err) return cb(err);
			utils.saveInterview(id, doc, function(err, document) {
				if (err) return cb(err);
				cb(null, document);
			});
		})
	})
}