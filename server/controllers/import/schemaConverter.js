var Document = require('../../models/document.js')
  , _ = require('underscore');

module.exports = function(docId, cb) {

	Document.getRecord(docId, function(err, doc) {
	  if (err) return cb(err);

	  _.each(doc.nodes, function(node) {

	    if (node.type === "text") {
	    	if(node.id.indexOf('paragraph') == 0) {
	    		var newId = node.id.replace('paragraph','paragraph_');
	    	} else {
	    		var newId = node.id.replace('text','paragraph_');
	    	}
	    	var paragraph = {
	    		type: "paragraph",
	    		content: node.content,
	    		id: newId
	    	}
	    	doc.nodes[newId] = paragraph;
	    	delete doc.nodes[node.id];

	    	var nodesIndex = doc.nodes.content.nodes;
	    	var index = nodesIndex.indexOf(node.id);

				if (index !== -1) {
				    nodesIndex[index] = newId;
				} else {
					console.log('index update fails on id', node.id);
				}
			}
	     
	   	if(node.type === "remark") {
		    var newId = node.id.replace('remark','comment_');
		    var content = node.content.replace('\n','</p><p>');
	    	var comment = {
	    		type: "comment",
	    		content: '<p>' + content + '</p>',
	    		container: node.container,
		      creator: "Archivist Bot",
		      created_at: new Date().toJSON(),
		      startPath: node.startPath,
		      startOffset: node.startOffset,
		      endPath: node.endPath,
		      endOffset: node.endOffset,
	    		id: newId
	    	}
	    	doc.nodes[newId] = comment;
	    	delete doc.nodes[node.id];
	   	}

	   	if(node.path) {
	   		if(node.path[0].indexOf("text") == 0) {
	   			var newId = node.path[0].replace('text','paragraph_');
	   			node.path[0] = newId;
	   		} else if (node.path[0].indexOf('paragraph') == 0 && node.path[0][9] != '_') {
	   			var newId = node.path[0].replace('paragraph','paragraph_');
	   			node.path[0] = newId;
	   		}
	   	}

	   	if(node.startPath) {
	   		if(node.startPath[0].indexOf("text") == 0) {
	   			var newId = node.startPath[0].replace('text','paragraph_');
	   			node.startPath[0] = newId;
	   		} else if (node.startPath[0].indexOf('paragraph') == 0 && node.startPath[0][9] != '_') {
	   			var newId = node.startPath[0].replace('paragraph','paragraph_');
	   			node.startPath[0] = newId;
	   		}
	   	}

	   	if(node.endPath) {
	   		if(node.endPath[0].indexOf("text") == 0) {
	   			var newId = node.endPath[0].replace('text','paragraph_');
	   			node.endPath[0] = newId;
	   		} else if (node.endPath[0].indexOf('paragraph') == 0 && node.endPath[0][9] != '_') {
	   			var newId = node.endPath[0].replace('paragraph','paragraph_');
	   			node.endPath[0] = newId;
	   		}
	   	}

	   	if(node.type === "document") {
	   		delete node.interviewee_prisons;
	   		node.interviewee_forced_labor_type = '';
	   		node.interviewee_category = '';
	   		node.published = false;
	   		node.abstract_de = "Enter german abstract here";
	   		node.short_summary = "Short summary in russian";
	      node.short_summary_en = "Short summary in english";
	      node.interviewee_bio_en = "Please enter respondent bio in english";
	      node.interviewee_bio_de = "Please enter respondent bio in german";
	   	}
	  });
		doc.schema = ["archivist-interview", "0.2.0"];


	  var user = {name: 'Archivist Bot'}
	  Document.change(docId, doc, user, function(err, doc) {
	    cb(err);
	  });
	});

};