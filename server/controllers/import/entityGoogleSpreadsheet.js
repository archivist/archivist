/*

GOOGLE SPREADSHEETS ENTITY IMPORTER

No need to use it anymore.

*/


var mongoose = require('mongoose')
  , Document = require('../../models/document.js')
  , Location = require('../../models/location.js')
  , Person = require('../../models/person.js')
  , Definition = require('../../models/definition.js')
  , Subject = require('../../models/subject.js')
  , express = require('express')
  , _ = require('underscore')
  , async = require('async')
  , GoogleSpreadsheets = require("google-spreadsheets")
  , Spreadsheet = require('edit-google-spreadsheet')
  , importer = express.Router();

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

// importer.route('/locations/prisons')
//   .get(importPrisonLocations)

// importer.route('/locations/toponyms')
//   .get(importToponymLocations)

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

// importer.route('/persons')
//   .get(importPersons)


var importDefinitions = function(req, res, next) {
  //mongoose.connection.collections['definitions'].drop( function(err) {
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
            var record = { synonyms: []},
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
              // parse additional attributes
              // if(column == 1 || column == 2 || column == 3) {
              //   if(column == 1) record.id = cell
              //   if(column == 2) record.synonyms.push(cell)
              //   if(column == 3) record.synonyms = _.union(record.synonyms, cell.split('; '));
              //   cellFound = true;
              // }
            });

            if(cellFound) {
              var definition = new Definition(record);
              definitionsCollection.push(definition);

              var spreadsheetData = {};
              spreadsheetData[n] = { 1: definition.id };
              spreadsheet.add(spreadsheetData);
            }
            // parse additional attributes
            // if(cellFound) {
            //   definitionsCollection.push(record)
            // }
          }
        });
        // parse additional attributes
        // async.eachLimit(definitionsCollection, 10, function(def, callback){
        //   Definition.findByIdAndUpdate(def.id, { $set: {synonyms: def.synonyms} }, { upsert: false }, function (err, record) {
        //     if (err) return err;
        //     console.log(def.id, 'has been edited')
        //     callback();
        //   });
        // }, function(err){
        //   if(err) {
        //     console.log('something goes wrong');
        //   } else {
        //     console.log('Importing and editing are done!')
        //   }
        // });
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
  //})
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

// importer.route('/definitions/comments')
//   .get(importDefinitions)

// importer.route('/definitions/abr')
//   .get(importDefinitionsAdditional)


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

// importer.route('/subjects')
//   .get(importSubjects)

module.exports = importer;