'use strict';

import { oo } from 'substance';

/*
  HTTP client for talking with DocumentServer
*/
function FileClient(config) {
  this.config = config;
}

FileClient.Prototype = function() {

  /*
    Upload file to the server
  */
  this.uploadFile = function(file, cb) {

    function transferComplete(e) {
      if(e.currentTarget.status === 200) {
        var data = JSON.parse(e.currentTarget.response);
        var path = '/media/' + data.name;
        cb(null, path);
      } else {
        cb(new Error(e.currentTarget.response));
      }
    }

    function updateProgress(e) {
      if (e.lengthComputable) {
        //var percentage = (e.loaded / e.total) * 100;
        //self.documentSession.hubClient.emit('upload', percentage);
      }
    }

    var formData = new window.FormData();
    formData.append("files", file);
    var xhr = new window.XMLHttpRequest();
    xhr.addEventListener("load", transferComplete);
    xhr.upload.addEventListener("progress", updateProgress);
    xhr.open('post', this.config.httpUrl, true);
    xhr.send(formData);
  };

};

oo.initClass(FileClient);

export default FileClient;