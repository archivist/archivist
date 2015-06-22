var mongoose = require('mongoose')
  , Document = require('../../models/document.js')
  , _ = require('underscore')
  , Interview = require('../interview/index.js')
  , Substance = require('Substance')
  , Spreadsheet = require('edit-google-spreadsheet');

exports.getToponyms = function(cb) {
  Spreadsheet.load({
    debug: true,
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || ''
    },
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    worksheetId: 'oh4v067'
    //worksheetName: 'Географический указатель'
  }, function run(err, spreadsheet) {
    if(err) throw err;
    //receive all cells
    spreadsheet.receive({},function(err, rows, info) {
      var items = [];
      _.each(rows, function(row, n){
        if (n != 1) {
          var item = {};
          _.each(row, function(cell, column) {
            if(column == '1') {
              item.id = cell;
            } else if(column == '3') {
              item.values = cell.split('; ')
            } else if(column == '10') {
              if(typeof cell.split === 'function') {
                item.interviews = cell.split('; ');
              } else if (typeof cell.split === 'undefined') {
                item.interviews = [];
              }
            }
          })
          items.push(item);
        }
      });
      cb(err, items);
    });
  });
}


exports.loadInterview = function(id, cb) {
  Document.get(id, function(err, doc){
    if (err) return cb(err);
    var interview = new Interview(doc);
    interview.version = doc.__v;
    cb(null, interview);
  });
}

exports.saveInterview = function(id, doc, cb) {
  var data = doc.toJSON();
  data._schema = data.schema;
  delete data.schema;
  Document.findByIdAndUpdate(id, { $set: JSON.parse(JSON.stringify(data)), $inc: { __v: 1 } }, {new: true}, function(err, document) {
    if(err) return cb(err);
    cb(null, document);
  })
}