var mongoose = require('mongoose')
  , Document = require('../../models/document.js')
  , _ = require('underscore')
  , Interview = require('../interview/index.js')
  , Substance = require('substance')
  , Spreadsheet = require('edit-google-spreadsheet');

var updateSPData = function(table, data, cb) {
  Spreadsheet.load({
    debug: true,
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || ''
    },
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    worksheetId: table
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

var getSPRealities = function(table, cb) {
  Spreadsheet.load({
    debug: true,
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || ''
    },
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    worksheetId: table
    //worksheetName: 'Сокращения'
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
              item.values = cell.split('; ');
            } else if(column == '5') {
              cell = cell.toString();
              if(typeof cell.split === 'function') {
                item.interviews = cell.split('; ');
              } else if (typeof cell.split === 'undefined') {
                item.interviews = [];
              }
            } else if(column == '7') {
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

var getSPPersons = function(table, cb) {
  console.log(table)
  console.log('loading spreadsheet...')
  Spreadsheet.load({
    debug: true,
    oauth2: {
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || ''
    },
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    //xworksheetId: 'oqthas0'
    worksheetName: 'Имена'
  }, function sheetReady(err, spreadsheet) {
    if(err) return cb(err);
    console.log('starting query worksheet...')
    //receive all cells
    spreadsheet.receive({},function(err, rows, info) {
      console.log('worksheet received')
      var items = [];
      _.each(rows, function(row, n){
        if (n != 1 && n[5]) {
          var item = {row: n, values: []};
          _.each(row, function(cell, column) {
            if(column == '1') {
              item.id = cell;
            } else if(column == '2') {
              item.values.push(cell);
            } else if(column == '3') {
              item.values = _.union(item.values, cell.split('; '));
            } else if(column == '5') {
              cell = cell.toString();
              if(typeof cell.split === 'function') {
                item.interviews = cell.split('; ');
              } else if (typeof cell.split === 'undefined') {
                item.interviews = [];
              }
            } else if(column == '6') {
              cell = cell.toString();
              item.timecodes = [];
              if(typeof cell.split === 'function') {
                var timecodes = cell.split('; ');
                _.each(timecodes, function(code){
                  var codes = code.split(':{');
                  if(codes.length == 2) { 
                    if(!item.timecodes[codes[0]]) item.timecodes[codes[0]] = [];
                    item.timecodes[codes[0]].push(codes[1].substring(0,8));
                  }
                })
              }
            } else if(column == '9') {
              item.found = cell;
            }
          })
          items.push(item);
        }
      });
      console.log(items)
      //cb(err, items);
    });
  });
}


// Update data from GS
exports.saveSPData = function(table, data, cb) {
  updateSPData(table, data, function(err){
    if(err) return cb(err);
    cb(null);
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

// Load prisons from GS using interview SP id
exports.loadSPPrisons = function(id, cb) {
  getSPPrisons(function(err, toponyms){
    if(err) return cb(err);
    var filtered = _.filter(toponyms, function(prison){ 
      return (_.contains(prison.interviews, id) || _.isEmpty(prison.interviews));
    });
    cb(null, filtered);
  });
}

// Load realities from GS using interview SP id
exports.loadSPRealities = function(id, table, cb) {
  getSPRealities(table, function(err, realities){
    if(err) return cb(err);
    var filtered = _.filter(realities, function(reality){ 
      return (_.contains(reality.interviews, id) || _.isEmpty(reality.interviews));
    });
    cb(null, filtered);
  });
}

// Load persons from GS using interview SP id
exports.loadSPPersons = function(id, table, cb) {
  getSPPersons(table, function(err, persons){
    if(err) return cb(err);
    var filtered = _.filter(persons, function(person){ 
      return (_.contains(person.interviews, id) || _.isEmpty(person.interviews));
    });
    cb(null, filtered);
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