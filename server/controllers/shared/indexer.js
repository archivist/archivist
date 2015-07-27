var request = require('superagent');

var indexerUrl = process.env.INDEXER_URL;

exports.reindex = function(id, cb) {
	var updateUrl = indexerUrl + "/update/document/" + id;
	request
		.get(updateUrl)
	  .end(function(err, res){
	  	if (res.ok) {
       	cb(null);
	    } else {
	      cb(new Error(res.text));
	    }
	  });
}

exports.getSubjects = function(cb) {
	var url = indexerUrl + "/subjects";
	request
		.get(url)
	  .end(function(err, res){
	  	if (res.ok) {
       	cb(null, res.body);
	    } else {
	      cb(new Error(res.text));
	    }
	  });
}