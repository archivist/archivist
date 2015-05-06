var mongoose = require('mongoose')
  , Document = require('../models/document.js')
  , Location = require('../models/location.js')
  , Person = require('../models/person.js')
  , Definition = require('../models/definition.js')
  , Subject = require('../models/subject.js')
  , express = require('express')
  , _ = require('underscore')
  , GoogleSpreadsheets = require("google-spreadsheets")
  , Spreadsheet = require('edit-google-spreadsheet')
  , Interview = require('./interview/index.js')
  , Substance = require('Substance')
  , importer = express.Router();

var annotateInterview = function(req, res, next) {
  var interviewDBId = '55451f3d1871404a0c7dff95';
  var interviewColumnId = '14';
  var interviewInternalId = '7';


  Spreadsheet.load({
      debug: true,
      username: process.env.GUSER || '',
      password: process.env.GPASS || '',
      spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
      worksheetId: 'opogbz4'
    }, function run(err, spreadsheet) {
      if(err) throw err;
      //receive all cells
      spreadsheet.receive({},function(err, rows, info) {
        var map = {};
        _.each(rows, function(row, n){
          if (n != 1) {
            var currentId = '';

            _.each(row, function(cell, column) {
              if(column == '1') {
                currentId = cell;
              }
              if(column == interviewColumnId && cell != '' && cell != ' ' && cell != '\n') {
                var cleared = cell.replace(/ /g, '');
                cleared = cleared.replace(/\n/g, '');
                var cleaner = new RegExp(interviewInternalId + ':{','g');
                cleared = cleared.replace(cleaner, '{');
                var path = cleared.split(';');
                _.each(path, function(val, i){
                  path[i] = val.split('-');
                })
                map[currentId] = path;
              }
            })
          }
        });
        Document.get(interviewDBId, function(err, doc){
          var interview = new Interview(doc);
          interview.version = doc.__v;
          var timecodesMap = {};
          var timecodes = interview.getIndex('type').get('timecode');
          var interviewContent = interview.get('content');
          _.each(timecodes, function(code, id){
            var content = interview.get(code.path);
            var timecode = content.substr(code.startOffset, code.endOffset);

            timecodesMap[timecode] = code;
          })
          _.each(map, function(path, subject){
            console.log('Search for subject #' + subject);
            //console.log(path)
            _.each(path, function(subjectCodes){
              //console.log(subjectCodes)
              if(subjectCodes.length > 1) {
                //console.log('Starts with ' + timecodesMap[subjectCodes[0]].id)
                //console.log('Ends with ' + timecodesMap[subjectCodes[1]].id)
                var endNodeId = interviewContent.getComponent(timecodesMap[subjectCodes[1]].path[0]).content.previous.rootId;
                //console.log(timecodesMap[subjectCodes[0]].startPath,timecodesMap[subjectCodes[0]].endOffset,subject,[endNodeId, 'content'],interview.get(endNodeId).content.length - 1, Substance.uuid())
                var tx = interview.startTransaction();
                tx.create({
                  type: "subject_reference",
                  startPath: timecodesMap[subjectCodes[0]].startPath,
                  startOffset: timecodesMap[subjectCodes[0]].endOffset,
                  target: [subject],
                  id: 'subject_reference' + Substance.uuid(),
                  endPath: [endNodeId, 'content'],
                  endOffset: interview.get(endNodeId).content.length
                })
                tx.save()
                tx.cleanup()
              } else {
                console.log('Some problems discovered, subject: #', subject, ', code: ', subjectCodes);
              }
            })
          })
          console.log(interview.version)
          var data = interview.toJSON();
          data._schema = data.schema;
          delete data.schema;
          Document.findByIdAndUpdate(interviewDBId, { $set: JSON.parse(JSON.stringify(data)), $inc: { __v: 1 } }, {new: true}, function(err, document) {
            if (err) return next(err);
            res.status(200).send(document);
          })
        })
      });
  });
}

importer.route('/interview')
  .get(annotateInterview)

var importPrisonLocations = function(req, res, next) {
  GoogleSpreadsheets({
    key: "1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE"
  }, function(err, spreadsheet) {
      spreadsheet.worksheets[3].cells({
          ///range: "R1C1:R5C5"
      }, function(err, result) {
        var locations = [];
        _.each(result.cells, function(row, key) {
          if( key != '1' && row.hasOwnProperty(8)) {
            var prison = {
              type: 'prison',
              name: '',
              synonyms: [],
              prison_type: '',
              nearest_locality: '',
              country: '',
              description: '',
              point: []
            }
            if(row.hasOwnProperty(1)) prison.name = row[1].value;
            if(row.hasOwnProperty(2)) prison.synonyms = prison.synonyms.concat(row[2].value.split(','));
            if(row.hasOwnProperty(3)) prison.synonyms = prison.synonyms.concat(row[3].value.split(','));
            if(row.hasOwnProperty(4)) prison.prison_type = row[4].value;
            if(row.hasOwnProperty(5)) prison.nearest_locality = row[5].value;
            if(row.hasOwnProperty(7)) prison.point = row[7].value.split(',');
            if(row.hasOwnProperty(8)) prison.country = row[8].value;
            if(row.hasOwnProperty(9)) prison.description = row[9].value;
            locations.push(prison);
          }
        });
        Location.create(locations, function (err) {
          if (err) {
            console.log(err);
            res.status(500).send(err.stack);
          } else {
            res.status(200).send(locations.length + ' locations have been imported!');
          }
        });
      });
  });
}

var importPrisonLocations = function(req, res, next) {
  Spreadsheet.load({
      debug: true,
      username: process.env.GUSER || '',
      password: process.env.GPASS || '',
      spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
      //worksheetName: 'Места заключения/пересылки'
      worksheetId: 'oa7lpit'
    }, function run(err, spreadsheet) {
      if(err) throw err;
      //receive all cells
      spreadsheet.receive({},function(err, rows, info) {
        var locationsCollection = [];
        var types = ['рабочий лагерь', 'пересыльный лагерь', 'штрафлагерь', 'проверочно-фильтрационный лагерь НКВД', 'тюрьма', 'лагерь для военнопленных', 'концлагерь', 'ГУЛаг', 'ферма', 'учебный лагерь', 'лагерь для перемещенных лиц', 'распределительный лагерь', 'лагерь внешней команды концлагеря', 'частный дом', 'неизвестно'];
        
        if(err) throw err;
        _.each(rows, function(row, n){
          if (n != 1) {
            var record = { type: 'prison', description: '' },
                cellFound = false;

            _.each(row, function(cell, column) {
              if((column == 2 || column == 5 || column == 6 || column == 7 || column == 9 || column == 10 || column == 11) && cell != '' && cell != ' ' && cell != '\n') {
                if(column == 2) record.name = cell;
                if(column == 5) record.prison_type = cell.split('; ');
                if(column == 6) record.synonyms = cell.split('; ');
                if(column == 7) record.nearest_locality = cell;
                if(column == 9) record.point = cell.split(',');
                if(column == 10) record.country = cell;
                if(column == 11) record.description = cell;

                cellFound = true;
              }
            });

            if(cellFound) {
              // _.each(record.prison_type, function(el) {
              //   var contains = _.contains(types, el);
              //   if(!contains) console.log(el)
              // })
              var location = new Location(record);
              locationsCollection.push(location);

              var spreadsheetData = {};
              spreadsheetData[n] = { 1: location.id };
              spreadsheet.add(spreadsheetData);
            }
          }
        });
        spreadsheet.send(function(err) {
          if(err) throw err;
          Location.create(locationsCollection, function(err, locations) {
            if(err) throw err;
            console.log("Locations importing has been completed!");
            res.status(200).send(locations.length + ' locations have been imported!');
          });
        });
      })
  })
}

var importToponymLocations = function(req, res, next) {
  mongoose.connection.collections['locations'].drop( function(err) {
    Spreadsheet.load({
        debug: true,
        username: process.env.GUSER || '',
        password: process.env.GPASS || '',
        spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
        //worksheetName: 'Географический указатель'
        worksheetId: 'oh4v067'
      }, function run(err, spreadsheet) {
        if(err) throw err;
        //receive all cells
        spreadsheet.receive({},function(err, rows, info) {
          var locationsCollection = [];

          if(err) throw err;
          _.each(rows, function(row, n){
            if (n != 1) {
              var record = { type: 'toponym', description: '' },
                  cellFound = false;

              _.each(row, function(cell, column) {
                if((column == 3 || column == 4 || column == 5 || column == 6 || column == 7 || column == 9) && cell != '' && cell != ' ' && cell != '\n') {
                  if(column == 3) record.synonyms = cell.split('; ');
                  if(column == 4) record.name = cell;
                  if(column == 5) record.point = cell.split(',');
                  if(column == 6) record.country = cell;
                  if(column == 7) record.current_name = cell;
                  if(column == 9) record.description = cell;

                  cellFound = true;
                }
              });

              if(cellFound) {
                var location = new Location(record);
                locationsCollection.push(location);

                var spreadsheetData = {};
                spreadsheetData[n] = { 1: location.id };
                spreadsheet.add(spreadsheetData);
              }
            }
          });
          spreadsheet.send(function(err) {
            if(err) throw err;
            Location.create(locationsCollection, function(err, locations) {
              if(err) throw err;
              console.log("Locations importing has been completed!");
              res.status(200).send(locations.length + ' locations have been imported!');
            });
          });
        })
    })
  })
}

importer.route('/locations/prisons')
  .get(importPrisonLocations)

importer.route('/locations/toponyms')
  .get(importToponymLocations)

var importPersons = function(req, res, next) {
  mongoose.connection.collections['persons'].drop( function(err) {
    Spreadsheet.load({
        debug: true,
        username: process.env.GUSER || '',
        password: process.env.GPASS || '',
        spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
        //worksheetName: 'Имена'
        worksheetId: 'oqthas0'
      }, function run(err, spreadsheet) {
        if(err) throw err;
        //receive all cells
        spreadsheet.receive({},function(err, rows, info) {
          var personsCollection = [];

          if(err) throw err;
          _.each(rows, function(row, n){
            if (n != 1) {
              var record = {},
                  cellFound = false;

              _.each(row, function(cell, column) {
                if((column == 2 || column == 4 || column == 7) && cell != '' && cell != ' ' && cell != '\n') {
                  if(column == 2) record.name = cell;
                  if(column == 4) record.description = cell;
                  if(column == 7) {
                    record.global = true;
                  } else {
                    record.global = false;
                  }

                  cellFound = true;
                }
              });

              if(cellFound) {
                var person = new Person(record);
                personsCollection.push(person);

                var spreadsheetData = {};
                spreadsheetData[n] = { 1: person.id };
                spreadsheet.add(spreadsheetData);
              }
            }
          });
          spreadsheet.send(function(err) {
            if(err) throw err;
            Person.create(personsCollection, function(err, persons) {
              if(err) throw err;
              console.log("Persons importing has been completed!");
              res.status(200).send(persons.length + ' persons have been imported!');
            });
          });
        })
    })
  })
}

importer.route('/persons')
  .get(importPersons)


var importDefinitions = function(req, res, next) {
  mongoose.connection.collections['definitions'].drop( function(err) {
    Spreadsheet.load({
      debug: true,
      username: process.env.GUSER || '',
      password: process.env.GPASS || '',
      spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
      //worksheetName: 'Жаргонизмы/реалии'
      worksheetId: 'o4yren4'
    }, function run(err, spreadsheet) {
      if(err) throw err;
      //receive all cells
      spreadsheet.receive({},function(err, rows, info) {
        var definitionsCollection = [];

        if(err) throw err;
        _.each(rows, function(row, n){
          if (n != 1) {
            var record = {},
                cellFound = false;

            _.each(row, function(cell, column) {
              if((column == 2 || column == 4 || column == 6) && cell != '' && cell != ' ' && cell != '\n') {
                if(column == 2) record.title = cell;
                if(column == 4) record.description = cell;
                if(column == 6) {
                  if(cell == 'да') {
                    record.type = 'лагерная реалия';
                  } else {
                    record.type = 'общий комментарий';
                  }   
                } else {
                  record.type = 'общий комментарий';
                }
                cellFound = true;
              }
            });

            if(cellFound) {
              var definition = new Definition(record);
              definitionsCollection.push(definition);

              var spreadsheetData = {};
              spreadsheetData[n] = { 1: definition.id };
              spreadsheet.add(spreadsheetData);
            }
          }
        });
        spreadsheet.send(function(err) {
          if(err) throw err;
          Definition.create(definitionsCollection, function(err, definitions) {
            if(err) throw err;
            console.log("Definitions importing has been completed!");
            res.status(200).send(definitions.length + ' definitions have been imported!');
          });
        });
      })
    })
  })
}

var importDefinitionsAdditional = function(req, res, next) {
  Spreadsheet.load({
    debug: true,
    username: process.env.GUSER || '',
    password: process.env.GPASS || '',
    spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
    //worksheetName: 'Сокращения'
    worksheetId: 'ow0uer7'
  }, function run(err, spreadsheet) {
    if(err) throw err;
    //receive all cells
    spreadsheet.receive({},function(err, rows, info) {
      var definitionsCollection = [];

      if(err) throw err;
      _.each(rows, function(row, n){
        if (n != 1) {
          var record = {},
              cellFound = false;

          _.each(row, function(cell, column) {
            if((column == 2 || column == 4) && cell != '' && cell != ' ' && cell != '\n') {
              if(column == 2) record.title = cell;
              if(column == 4) record.description = cell;
              record.type = 'сокращение';
              cellFound = true;
            }
          });

          if(cellFound) {
            var definition = new Definition(record);
            definitionsCollection.push(definition);

            var spreadsheetData = {};
            spreadsheetData[n] = { 1: definition.id };
            spreadsheet.add(spreadsheetData);
          }
        }
      });
      spreadsheet.send(function(err) {
        if(err) throw err;
        Definition.create(definitionsCollection, function(err, definitions) {
          if(err) throw err;
          console.log("Definitions importing has been completed!");
          res.status(200).send(definitions.length + ' definitions have been imported!');
        });
      });
    })
  })
}

importer.route('/definitions/comments')
  .get(importDefinitions)

importer.route('/definitions/abr')
  .get(importDefinitionsAdditional)


var importSubjects = function(req, res, next) {
  mongoose.connection.collections['subjects'].drop( function(err) {
    Spreadsheet.load({
      debug: true,
      username: process.env.GUSER || '',
      password: process.env.GPASS || '',
      spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
      worksheetId: 'opogbz4'
    }, function run(err, spreadsheet) {
      if(err) throw err;
      //receive all cells
      spreadsheet.receive({},function(err, rows, info) {
        if(err) throw err;
        var tree = [],
            indexObj = {
              1: {
                index: 0,
                lastItem: ''
              },
              2: {
                index: 0,
                lastItem: ''
              },
              3: {
                index: 0,
                lastItem: ''
              },
              4: {
                index: 0,
                lastItem: ''
              },
              5: {
                index: 0,
                lastItem: ''
              }, 
              6: {
                index: 0,
                lastItem: ''
              }
            },
            lastEl = {
              level: 0
            };

        _.each(rows, function(row, n){
          if (n != 1) {
            var record = {},
                cellFound = false;

            _.each(row, function(cell, column) {
              if(!cellFound) {
                if(column < 8 && column > 1 && cell != '' && cell != ' ' && cell != '\n') {
                  record.name = cell;
                  record.level = column - 1;
                  record.position = indexObj[record.level].index;
                  record.parent = record.level == 1 ? '' : indexObj[record.level - 1].lastItem;
                  var subject = new Subject(record);
                  tree.push(subject);
                  indexObj[record.level].index++;
                  indexObj[record.level].lastItem = subject.id;
                  if(lastEl.level > record.level) {
                    var last = lastEl.level;
                    while (last > record.level) {
                      indexObj[lastEl.level].index = 0;
                      last--;
                    }
                  }
                  lastEl = record;
                  cellFound = true;

                  var spreadsheetData = {};
                  spreadsheetData[n] = { 1: subject.id };
                  spreadsheet.add(spreadsheetData);
                }
              }
            });
          }
        });
        spreadsheet.send(function(err) {
          if(err) throw err;
          Subject.create(tree, function(err, subjects) {
            if(err) throw err;
            console.log("Subject importing has been completed!");
            res.status(200).send(subjects.length + ' subjects have been imported!');
          });
        });
      });
    });
    res.send(200)
  });
}

importer.route('/subjects')
  .get(importSubjects)

module.exports = importer;