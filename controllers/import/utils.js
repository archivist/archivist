var mongoose = require('mongoose')
  , Document = require('../../models/document.js')
  , _ = require('underscore')
  , Interview = require('../interview/index.js')
  , Substance = require('Substance')
  , Spreadsheet = require('edit-google-spreadsheet');

var getSPToponyms = function(cb) {
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
    if(err) return cb(err);
    //receive all cells
    spreadsheet.receive({},function(err, rows, info) {
      var items = [];
      _.each(rows, function(row, n){
        if (n != 1) {
          var item = {row: n};
          _.each(row, function(cell, column) {
            if(column == '1') {
              item.id = cell;
            } else if(column == '3') {
              item.values = cell.split('; ')
            } else if(column == '10') {
              cell = cell.toString();
              if(typeof cell.split === 'function') {
                item.interviews = cell.split('; ');
              } else if (typeof cell.split === 'undefined') {
                item.interviews = [];
              }
            } else if(column == '10') {
              item.found = cell;
            }
          })
          items.push(item);
        }
      });
      cb(err, items);
    });
  });
}

var updateSPToponyms = function(data, cb) {
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
  }, function sheetReady(err, spreadsheet) {
      if(err) return cb(err);
      spreadsheet.add(data);
      spreadsheet.send(function(err) {
        if(err) return cb(err);
        cb(null);
      });
    });
}

var getSPPrisons = function(cb) {
  Spreadsheet.load({
    debug: true,
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || ''
    },
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    worksheetId: 'oa7lpit'
    //worksheetName: 'Места заключения/пересылки'
  }, function run(err, spreadsheet) {
    if(err) return cb(err);
    //receive all cells
    spreadsheet.receive({},function(err, rows, info) {
      var items = [];
      _.each(rows, function(row, n){
        if (n != 1) {
          var item = {row: n};
          _.each(row, function(cell, column) {
            if(column == '1') {
              item.id = cell;
            } else if(column == '4') {
              item.forms = cell.split('; ');
            } else if(column == '6') {
              item.values = cell.split('; ');
            } else if(column == '12') {
              cell = cell.toString();
              if(typeof cell.split === 'function') {
                item.interviews = cell.split('; ');
              } else if (typeof cell.split === 'undefined') {
                item.interviews = [];
              }
            } else if(column == '14') {
              item.found = cell;
            }
          })
          items.push(item);
        }
      });
      cb(err, items);
    });
  });
}

var updateSPPrisons = function(data, cb) {
  Spreadsheet.load({
    debug: true,
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || ''
    },
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    worksheetId: 'oa7lpit'
    //worksheetName: 'Места заключения/пересылки'
  }, function sheetReady(err, spreadsheet) {
      if(err) return cb(err);
      spreadsheet.add(data);
      spreadsheet.send(function(err) {
        if(err) return cb(err);
        cb(null);
      });
    });
}

// Load toponyms from GS using interview SP id
exports.loadSPToponyms = function(id, cb) {
  getSPToponyms(function(err, toponyms){
    if(err) return cb(err);
    var filtered = _.filter(toponyms, function(toponym){ 
      return (_.contains(toponym.interviews, id) || _.isEmpty(toponym.interviews));
    });
    cb(null, filtered);
  });
}

// Update toponyms from GS
exports.saveSPToponyms = function(data, cb) {
  updateSPToponyms(data, function(err){
    if(err) return cb(err);
    cb(null);
  });
}

// Load prisons from GS using interview SP id
exports.loadSPPrisons = function(id, cb) {
  getSPPrisons(function(err, toponyms){
    if(err) return cb(err);
    var filtered = _.filter(toponyms, function(toponym){ 
      return (_.contains(toponym.interviews, id) || _.isEmpty(toponym.interviews));
    });
    cb(null, filtered);
  });
}

// Update prisons from GS
exports.saveSPPrisons = function(data, cb) {
  updateSPPrisons(data, function(err){
    if(err) return cb(err);
    cb(null);
  });
}

// Load specific interview by mongo id, returns substance doc
exports.loadInterview = function(id, cb) {
  Document.get(id, function(err, doc){
    if (err) return cb(err);
    var interview = new Interview(doc);
    interview.version = doc.__v;
    cb(null, interview);
  });
}

// Save specific interview by mongo id, takes id and substance doc, returns json
exports.saveInterview = function(id, doc, cb) {
  var data = doc.toJSON();
  data._schema = data.schema;
  delete data.schema;
  Document.findByIdAndUpdate(id, { $set: JSON.parse(JSON.stringify(data)), $inc: { __v: 1 } }, {new: true}, function(err, document) {
    if(err) return cb(err);
    cb(null, document);
  })
}