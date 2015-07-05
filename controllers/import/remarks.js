var _ = require('underscore')
	, Substance = require('substance');


var findOrCreateEntityReport = function(doc, content) {
	var contentCotainer = doc.get('content');
	var comp = contentCotainer.getFirstComponent();
	var remarks = doc.getIndex('type').get('remark');
	var reportId = false;

	_.each(remarks, function(remark) {
		if(remark.startPath === comp.path) reportId = remark.id;
	});

	if(reportId) {
		updateRemarkAnnotation(reportId, content);
	} else {
		var text = doc.get(comp.path);
		createRemarkAnnotation(doc, comp.path, 0, comp.path, text.length, content);
	}
}

var findOrCreatePersonReport = function(doc, content, startCode, endCode) {
	var contentCotainer = doc.get('content');
	var remarks = doc.getIndex('type').get('remark');
	var reportId = false;

	_.each(remarks, function(remark) {
		if(remark.startPath == startCode.path && remark.endPath == startCode.endPath) reportId = remark.id;
	});

	if(reportId) {
		updateRemarkAnnotation(reportId, content);
	} else {
		createRemarkAnnotation(doc, startCode.path, startCode.startOffset, endCode.path, endCode.endOffset, content);
	}
}

/*
	REMARK ANNOTATION EXAMPLE

	remark46e650435699c3255ef964d0cd21e885: {
	  endOffset: 388,
	  startOffset: 0,
	  endPath: [
	    "text52423c8e35727d425585812ca49395b9",
	    "content"
	  ],
	  startPath: [
	    "text52423c8e35727d425585812ca49395b9",
	    "content"
	  ],
	  content: "sadasdasdasdddsgdfgdfgs\ndfgsdfgsfdg",
	  container: "content",
	  type: "remark",
	  id: "remark46e650435699c3255ef964d0cd21e885"
	}
*/

// Remark annotation creation via document transaction
var createRemarkAnnotation = function(doc, startPath, startOffset, endPath, endOffset, content) {
	var tx = doc.startTransaction();
	tx.create({
    type: "remark",
    startPath: startPath,
    startOffset: startOffset,
    container: "content",
    id: 'remark_' + Substance.uuid(),
    endPath: endPath,
    endOffset: endOffset,
    content: content
  })
  tx.save()
  tx.cleanup()
}

// Update content of remark annotation via document transaction
var updateRemarkAnnotation = function(id, content) {
	var tx = doc.startTransaction();
	tx.set([id, "content"], content);
	tx.save();
  tx.cleanup();
}

// Create remark annotation with list of entities which didn't found
exports.writeOutEntityReport = function(doc, found, entities, intro) {
	var content = intro + '\n';
	var lostEntities = _.filter(entities, function(entity){ 
		return _.isUndefined(found[entity.row]); 
	});
	_.each(lostEntities, function(entity, id) {
		if(!_.isUndefined(entity.interviews)) {
			if(!_.isEmpty(entity.interviews)) {
				content += (id + 1) + '. ';
				content += entity.values.join(', ');
				content += " (" + entity.id + ");\n";
			}
		}
	});
	findOrCreateEntityReport(doc, content);
}

exports.writeOutPersonsReport = function(doc, report, timecodesMap, intro) {
	var noTimecodes = []
	var i = 0;
	var j = 0;
	_.each(report, function(item){
		if(!item.found){
			i++;
			if(_.isEmpty(item.timecodes)) {
				noTimecodes.push(item);
			} else {
				var startCode = timecodesMap[item.timecodes[0]];
				var endCode = timecodesMap[item.timecodes[1]];
				var content = '';
				content += '- ';
				content += item.person.values.join(', ');
				content += " (" + item.person.id + ");\n";
				findOrCreatePersonReport(doc, content, startCode, endCode);
			}
		}
		j++;
	});
	console.log(i,"persons of", j, "didn't recognized");
	if(!_.isEmpty(noTimecodes)){
		var content = 'В этом интервью не нашлись следующие персоналии:\n';
		_.each(noTimecodes, function(item, id){
			content += (id + 1) + '. ';
			content += item.person.values.join(', ');
			content += " (" + item.person.id + ");\n";
		});
		findOrCreateEntityReport(doc, content);
	}
}
