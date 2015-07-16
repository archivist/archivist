var request = require('superagent');

var indexerUrl = "http://ost-index.d4s.io";

exports.update = function(id, cb) {
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