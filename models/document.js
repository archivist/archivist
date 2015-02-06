// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async')
  , backup = require('../controllers/backup.js');

var documentSchema = new Schema({
  	_schema: [String]
  , nodes: Schema.Types.Mixed
});

documentSchema.set('toJSON', { getters: true, virtuals: true })

var documentShadowSchema = new Schema({}, {collection: 'documents_backup', strict: false}),
		documentShadow = mongoose.model('documentShadow', documentShadowSchema);

documentSchema.plugin(backup, { shadow: documentShadow });

documentSchema.statics.createEmpty = function(cb) {
	var docId = mongoose.Types.ObjectId();

	var emptyDocJson = {
	  "id": docId,
	  "_schema": [
	    "archivist-interview",
	    "0.1.0"
	  ],
	  "nodes": {
	    "document": {
	      "id": "document",
	      "type": "document",
	      "views": [
	        "content",
	        "citations",
	        "remarks",
	        "info"
	      ],
	      "license": "licence",
	      "guid": docId,
	      "creator": "",
	      "title": "Untitled",
	      "authors": [],
	      "abstract": "",
	      "abstract_en": "",
	      "created_at": new Date().toJSON(),
	      "updated_at": new Date().toJSON(),
	      "published_on": new Date().toJSON()
	    },
	    "cover": {
	      "id": "cover",
	      "type": "cover",
	      "authors": []
	    },
	    "content": {
	      "type": "view",
	      "id": "content",
	      "nodes": [
	        "cover",
	        "text1"
	      ]
	    },
	    "citations": {
	      "type": "view",
	      "id": "citations",
	      "nodes": []
	    },
	    "remarks": {
	      "type": "view",
	      "id": "remarks",
	      "nodes": []
	    },
	    "info": {
	      "type": "view",
	      "id": "info",
	      "nodes": [
	        "publication_info",
	        "interview_subject",
	        "interview_conductor",
	        "interview_operator",
	        "interview_sound_operator"
	      ]
	    },
	    "text1": {
	      "type": "text",
	      "id": "text1",
	      "content": "Please write interview here"
	    },
	    "publication_info": {
	      "id": "publication_info",
	      "type": "publication_info"
	    },
	    "interview_subject": {
	      "type": "interview_subject",
	      "id": "interview_subject",
	      "name": "The Interviewed",
	      "role": "Interview Subject",
	      "forced_labor": "intracamp work; earthworks (construction of barracks); digging tunnels for military factories",
	      "categories": [
	        "Ost arbeiter",
	        "Cocentration camp worker"
	      ],
	      "prisons": [
	        "location_komorn"
	      ],
	      "movement": [
	        "location_danzig:33",
	        "location_komorn:67"
	      ],
	      "description": "",
	      "image": ""
	    },
	    "interview_conductor": {
	      "type": "contributor",
	      "id": "interview_conductor",
	      "source_id": "",
	      "name": "Daniel Beilinson",
	      "role": "Interview Conductor",
	      "description": "",
	      "image": ""
	    },
	    "interview_operator": {
	      "type": "contributor",
	      "id": "interview_operator",
	      "source_id": "",
	      "name": "Oliver Buchtala",
	      "role": "Operator",
	      "description": "",
	      "image": ""
	    },
	    "interview_sound_operator": {
	      "type": "contributor",
	      "id": "interview_sound_operator",
	      "source_id": "",
	      "name": "Michael Aufreiter",
	      "role": "Sound Operator",
	      "description": "",
	      "image": ""
	    },
	    "license": {
	      "id": "license",
	      "type": "license",
	      "name": "None",
	      "code": "none",
	      "description": "",
	      "version": "1.0",
	      "url": ""
	    }
	  }
	};
	
	var emptyDoc = new this(emptyDocJson);
  emptyDoc.save(function(err, emptyDoc) {
    cb(err, emptyDoc);
  });
}
 
module.exports = mongoose.model('Document', documentSchema);