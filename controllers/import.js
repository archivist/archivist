var mongoose = require('mongoose')
  , Document = require('../models/document.js')
  , Location = require('../models/location.js')
  , Person = require('../models/person.js')
  , Definition = require('../models/definition.js')
  , Subject = require('../models/subject.js')
  , express = require('express')
  , _ = require('underscore')
  , async = require('async')
  , GoogleSpreadsheets = require("google-spreadsheets")
  , Spreadsheet = require('edit-google-spreadsheet')
  , Interview = require('./interview/index.js')
  , Substance = require('Substance')
  , importer = express.Router();


var lunr = require('../node_modules/lunr-languages/demos/lib/lunr.js');
require('../node_modules/lunr-languages/lunr.stemmer.support.js')(lunr);
require('../node_modules/lunr-languages/lunr.ru.js')(lunr);

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
        var codes = {};
        _.each(map, function(path, subject) {
          _.each(path, function(subjectCodes){
            if(_.isUndefined(codes[subjectCodes])) {
              codes[subjectCodes] = [];
              codes[subjectCodes].push(subject);
            } else {
              codes[subjectCodes].push(subject);
            }
          });
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
          _.each(codes, function(subjects, code){
            //console.log('Search for subject #' + subject);
            //console.log(path)
            var subjectCodes = code.split(',');
            console.log(subjectCodes)
            //_.each(path, function(subjectCodes){
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
                target: subjects,
                container: "content",
                id: 'subject_reference_' + Substance.uuid(),
                endPath: [endNodeId, 'content'],
                endOffset: interview.get(endNodeId).content.length
              })
              tx.save()
              tx.cleanup()
            } else {
              console.log('Some problems discovered, subject: #', code, ', code: ', subjectCodes);
            }
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


var getToponyms = function(cb) {
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

var entitiesAnnotator = function(req, res, next) {
  getToponyms(function(err, toponyms){
    if(err) return next(err);
    console.log(toponyms);
  })
  res.json(200);
};

importer.route('/entities')
  .get(entitiesAnnotator)


var lunrTest = function(req, res, next) {
  /* init lunr */
  var searchString = req.params.searchword;
  var idx = lunr(function () {
    // use the language (de)
    this.use(lunr.ru);
    // then, the normal lunr index initialization
    this.field('body')
  });

  /* add documents to index */
  idx.add({
      "title": "Deutschland",
      "body": "Ну, родилась я в 23-м году в семье рабочего. Мама у меня была домохозяйка. Семья была: мама, папа, старшая сестра, она на одиннадцать лет меня старше, была ещё сестрёнка, которая лет на девять меня была старше. Жили мы в Рязани. В 21-м году, то есть в 23-м году… В 25-м году семья перебралась в Москву. И папа работал уже как механик. Я не помню, поначалу, где он работал. Мама была тоже домохозяйкой. И в 25-м же году младшая сестрёнка (вот которая средняя сестра), Мария, она погибла. Это дело было зимой. Она пришла из школы, сняла с себя школьную одежду, одела лёгкий халатик. А форточка была приоткрыта. Мы жили в коммуналке, и мама зачем-то вышла к соседке. А дверь не была прикрыта. И вот сквозняком у неё в печку (у нас было дровяное отопление) халатик задуло, в этот, в топку, и загорелся. Сестра, хоть и, в общем-то, ей было одиннадцать лет, она не понимала как. Она стала руками тушить на ней одежду, но не вышло. И тогда вот Мария выскочила в коридор, и, конечно, от шума все соседи тоже вышли. И соседка, которая жила напротив, схватила покрывало и закутала её, но это, в общем, Марию не спасло. Она месяц мучалась и умерла.",
      "id": 1
  });
  idx.add({
      "title": "Tourismus in Deutschland",
      "body": "И вот нас привезли в город Фюрстенберг. Этот Фюрстенберг – город, где на окраине его находился концлагерь Равенсбрюк. Концлагерь Равенсбрюк – это сугубо женский лагерь. Мужчин в этом лагере не было . Э-э <---> Открылись огромные… огромная четырехметровая, если не выше, стена, наверху – проволока в два ряда с током высокого напряжения, и –  брама, как они назвались – ворота открылись, нас ввели в этот лагерь. И мы пока стояли, и… а это было уже утро, и шла колонна женщин, видимо, на работу за пределы лагеря. Потому что я услышала голос: «Русские есть?» Я говорю: «Есть».– «Ты кто?» Я говорю: «Военнопленная». – «Откуда?» – «Из Москвы». – «Хорошо, будет доложено». И всё. Нас пропустили через баню, то есть раздели нас, вывели, а это уже, считай, зима. Вывели нас… Глубокая осень. Вывели нас на улицу, и мы в эту баню должны были лезть в окно, через окно. В окно мы влезли, и там душ, который перемежался: то с горячей водой, то с холодной водой. Э-э при этой бане работала одна наша военнопленная, Галя Матузова такая. Она – киевлянка. Когда я оттуда уже вышла, там давали уже не полосатую одежду, а гражданскую, но сзади, на спине, было вырезано… крест такой, и вшита совсем другая материя.И, значит, вешали нам такой вензель красный, где было написано: вот у русских –  R, у военнопленных Совета унион –  SU – и номер. И когда я уже стала выходить из бани, вот эта Галя мне шепчет: «Я что-то из твоей одежды оставила, принесу в карантинный блок». Говорю: «Хорошо». Нас повели в карантинный блок. Правда, мы ещё стояли долго на улице, потом привели в карантинный блок. Э-э… Через день вдруг слышу: «Где здесь русская?» Я говорю: «Я». Тоже, почему-то, я все время на верхних э-э этих полках нар находилась. Она поднялась, это была Тамара Булычева, тоже военнопленная. Значит: «Ты откуда?» Я говорю: «Я – москвичка». -- «О, я тоже москвичка. Будем стараться, чтобы ты на карантинном блоке была как можно меньше. Возможно, даже через неделю мы тебя заберём в свой  блок, барак». И так и было. Даже меньше, чем через неделю, пришли девушки, забрали меня. И я поселилась уже на нарах третьего этажа. А там так: первый этаж было… можно было даже вот на колени встать, второй этаж – там сидя, ну а третий этаж – там уже, как хочешь. «Чичака» называлась. И вот там моей подруге, которая на всю жизнь (к несчастью, уже почти никого нет в живых), такая Мария Петрушина, э-э она из Клязьмы, из Подмосковья. Была такая Зоя, она тогда была Ольнева, потом Зоя Захарова была, она, вообще, попала в плен в Севастополе. Она была медсестрой, попала в плен. Она была ранена, раненная попала в плен. Потом была Лида, мы её звали... У всех была кличка: Мария – «Москва», Зоя была «Граф», потому что она вся такая вот такая, но там мы все вот такие были, но она, несмотря на это, была фигуристая, а не совсем доской. Лида Назарова, честно говоря, я не помню, откуда. Звали её «Пушкин» из-за ее кудрявых волос. Когда я попала в плен, уже не стригли наголо. Вот. Вот Тамара Булычева, москвичка, и почему-то это, то ли потому что Тамара и Мария – москвички, да тут ещё и я, но называлась «семья москвичей». ",
      "id": 2
  });

  console.log('Search for', searchString, ': ', idx.search(searchString));
}

importer.route('/lunr/:searchword')
  .get(lunrTest)


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