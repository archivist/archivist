/*
  General script for importing data from old MongoDB setup.
  Data must be exported as JSON before running this script.
  Script expects path to collection's JSON files on input,
  e.g. import documents=../../data/documents.json users=../../data/users.json etc
*/

let process = require('process')
let fs = require('fs')
let forEach = require('lodash/forEach')
let uniq = require('lodash/uniq')
let JSONConverter = require('substance').JSONConverter
let documentHelpers = require('substance').documentHelpers
let Database = require('../packages/common/Database')
let Configurator = require('../packages/common/ServerConfigurator')
let EnginePackage = require('../packages/engine/package')
let IndexerPackage = require('../packages/indexer/package')
let InterviewPackage = require('../dist/archivist.cjs').InterviewPackage

let args = process.argv.slice(2)
let config = {}

args.forEach(function(arg) {
  let option = arg.split('=')
  if(option.length === 2) {
    config[option[0]] = option[1]
  } 
})

let db = new Database()
let configurator = new Configurator().import(InterviewPackage)
let converter = new JSONConverter()
configurator.setDBConnection(db)
configurator.import(EnginePackage)
configurator.import(IndexerPackage)

let defaultUser = '54bd3cff742c750408dacf9d'
let entitiesTypesMap = {}

function importUsers() {
  let exists = _fileExists(config.users)
  if(!exists) return

  let jsonContents = fs.readFileSync(config.users)
  let jsonData = JSON.parse(jsonContents)
  let usersData = []

  jsonData.forEach(function(user) {
    let userData = {
      userId: user._id['$oid'],
      name: user.name,
      email: user.email,
      created: _getTimeFromId(user._id['$oid'])
    }
    usersData.push(userData)
  })

  let userStore = configurator.getStore('user')
  return userStore.seed(usersData)
}

function importPersons() {
  let exists = _fileExists(config.persons)
  if(!exists) return

  let jsonContents = fs.readFileSync(config.persons)
  let jsonData = JSON.parse(jsonContents)
  let personsData = []

  jsonData.forEach(function(person) {
    let personData = {
      entityId: person._id['$oid'],
      name: person.name,
      description: person.description,
      synonyms: [],
      created: person.createdAt['$date'],
      edited: person.updatedAt['$date'],
      entityType: 'person',
      data: {
        name: person.name,
        synonyms: [],
        description: person.description,
        global: person.global,
      }
    }
    personData.updatedBy = person.edited ? person.edited['$oid'] : defaultUser
    personData.userId = person.edited ? person.edited['$oid'] : defaultUser
    entitiesTypesMap[personData.entityId] = personData.entityType
    personsData.push(personData)
  })

  let entityStore = configurator.getStore('entity')
  return entityStore.seed(personsData)
}

function importDefinitions() {
  let exists = _fileExists(config.definitions)
  if(!exists) return

  let jsonContents = fs.readFileSync(config.definitions)
  let jsonData = JSON.parse(jsonContents)
  let definitionsData = []

  jsonData.forEach(function(definition) {
    let definitionData = {
      entityId: definition._id['$oid'],
      name: definition.title,
      description: definition.description,
      synonyms: [],
      created: definition.createdAt['$date'],
      edited: definition.updatedAt['$date'],
      entityType: 'definition',
      data: {
        name: definition.title,
        description: definition.description,
        definitionType: definition.type
      }
    }

    definitionData.synonyms = definition.synonyms
    if(definitionData.synonyms.indexOf(definition.title) > -1) {
      let pos = definitionData.synonyms.indexOf(definition.title)
      definitionData.synonyms.splice(pos, 1)
    }
    definitionData.data.synonyms = definitionData.synonyms

    definitionData.updatedBy = definition.edited ? definition.edited['$oid'] : defaultUser
    definitionData.userId = definition.edited ? definition.edited['$oid'] : defaultUser
    entitiesTypesMap[definitionData.entityId] = definitionData.entityType
    definitionsData.push(definitionData)
  })

  let entityStore = configurator.getStore('entity')
  return entityStore.seed(definitionsData)
}

function importLocations() {
  let exists = _fileExists(config.locations)
  if(!exists) return

  let jsonContents = fs.readFileSync(config.locations)
  let jsonData = JSON.parse(jsonContents)
  let locationsData = []

  jsonData.forEach(function(location) {
    let locationData = {
      entityId: location._id['$oid'],
      name: location.name, 
      description: location.description,
      edited: location.updatedAt['$date'],
      entityType: location.type,
      data: {
        name: location.name,
        description: location.description,
        country: location.country,
        point: location.point
      }
    }

    locationData.synonyms = location.synonyms
    if(locationData.synonyms.indexOf(location.name) > -1) {
      let pos = locationData.synonyms.indexOf(location.name)
      locationData.synonyms.splice(pos, 1)
    }
    locationData.data.synonyms = locationData.synonyms

    if(locationData.entityType === 'toponym') {
      locationData.data.currentName = location.current_name
    } else if (locationData.entityType === 'prison') {
      locationData.data.nearestLocality = location.nearest_locality
      locationData.data.prisonType = location.prison_type
    }

    locationData.created = location.createdAt ? location.createdAt['$date'] : location.updatedAt['$date']
    locationData.updatedBy = location.edited ? location.edited['$oid'] : defaultUser
    locationData.userId = location.edited ? location.edited['$oid'] : defaultUser
    entitiesTypesMap[locationData.entityId] = locationData.entityType
    locationsData.push(locationData)
  })

  let entityStore = configurator.getStore('entity')
  return entityStore.seed(locationsData)
}

function importSubjects() {
  let exists = _fileExists(config.subjects)
  if(!exists) return

  let jsonContents = fs.readFileSync(config.subjects)
  let jsonData = JSON.parse(jsonContents)
  let subjectsData = []

  jsonData.forEach(function(subject) {
    let subjectData = {
      entityId: subject._id['$oid'],
      name: subject.name,
      synonyms: [subject.name],
      description: subject.description || '',
      edited: subject.updatedAt['$date'],
      entityType: 'subject',
      data: {
        name: subject.name,
        workname: subject.workname,
        description: subject.description || '',
        parent: subject.parent || null,
        position: subject.position
      }
    }

    if(subject.name !== subject.workname) subjectData.synonyms.push(subject.workname)
    subjectData.created = subject.createdAt ? subject.createdAt['$date'] : subject.updatedAt['$date']
    subjectData.updatedBy = subject.edited ? subject.edited['$oid'] : defaultUser
    subjectData.userId = subject.edited ? subject.edited['$oid'] : defaultUser
    subjectsData.push(subjectData)
  })

  let entityStore = configurator.getStore('entity')
  return entityStore.seed(subjectsData)
}

function importDocuments() {
  let exists = _fileExists(config.documents)
  if(!exists) return

  let jsonContents = fs.readFileSync(config.documents)
  let jsonData = JSON.parse(jsonContents)

  let changes = {}
  let documents = {}
  let snapshots = {}
  
  jsonData.forEach(function(doc) {
    // Document processing
    // ===================

    let docId = doc._id['$oid']

    let documentData = {
      nodes: [],
      schema: {
        name: "archivist-interview",
        version: "1.0.0"
      }
    }

    let bodyNode = {
      id: 'body',
      type: 'container',
      nodes: []
    }

    let contentNodes = doc.nodes.content.nodes
    let entities = []
    let subjects = []
    let paragraphsMap = {}
    let fullText = ''
    let metaSource = {}
    let metaNode = {}
    let pIndex = 1
    let sIndex = 1
    let eIndex = 1
    let tIndex = 1
    let cIndex = 1
    let subjectIndex = 1
    let entityIndexes = {
      'person': 1,
      'definition': 1,
      'prison': 1,
      'location': 1
    }

    contentNodes.forEach(function(nodeId) {
      let paragraphId = 'paragraph-' + pIndex
      let paragraph = doc.nodes[nodeId]
      paragraph.id = paragraphId

      fullText += '\r\n' + paragraph.content
      paragraphsMap[nodeId] = paragraphId
      bodyNode.nodes.push(paragraphId)
      documentData.nodes.push(paragraph)
      pIndex++
    })

    forEach(doc.nodes, function(node) {
      if(node.type === 'strong') {
        node.id = 'strong-' + sIndex
        node.path[0] = paragraphsMap[node.path[0]]
        documentData.nodes.push(node)
        sIndex++
      } else if (node.type === 'emphasis') {
        node.id = 'emphasis-' + eIndex
        node.path[0] = paragraphsMap[node.path[0]]
        documentData.nodes.push(node)
        eIndex++
      } else if (node.type === 'timecode') {
        node.id = 'timecode-' + tIndex
        node.path[0] = paragraphsMap[node.path[0]]
        documentData.nodes.push(node)
        tIndex++
      } else if (node.type === 'subject_reference') {
        let subject = {
          id: 'subject-' + subjectIndex,
          containerId: 'body',
          type: 'subject',
          startPath: [
            paragraphsMap[node.startPath[0]],
            'content'
          ],
          startOffset: node.startOffset,
          endPath: [
            paragraphsMap[node.endPath[0]],
            'content'
          ],
          endOffset: node.endOffset,
          references: node.target
        }
        subjects.concat(node.target)
        documentData.nodes.push(subject)
        subjectIndex++
      } else if (node.type === 'comment') {
        let comment = {
          id: 'comment-' + cIndex,
          containerId: 'body',
          content: node.content,
          type: 'comment',
          startPath: [
            paragraphsMap[node.startPath[0]],
            'content'
          ],
          startOffset: node.startOffset,
          endPath: [
            paragraphsMap[node.endPath[0]],
            'content'
          ],
          endOffset: node.endOffset,
          author: defaultUser,
          createdAt: node.created_at
        }
        documentData.nodes.push(comment)
        cIndex++
      } else if (node.type === 'entity_reference') {
        let entityType = entitiesTypesMap[node.target]
        let entity = {
          id: entityType + '-' + entityIndexes[entityType],
          endOffset: node.endOffset,
          startOffset: node.startOffset,
          path: [
            paragraphsMap[node.path[0]],
            'content'
          ],
          reference: node.target,
          type: entityType
        }
        entities.push(node.target)
        documentData.nodes.push(entity)
        entityIndexes[entityType]++
      } else if (node.type === 'document') {
        metaSource = node
        metaNode = {
          id: 'meta',
          type: 'meta',
          title: node.title,
          state: '',
          abstract: node.abstract,
          abstract_translation: node.abstract_en,
          abstract_translation_second: node.abstract_de,
          media_id: node.media_id,
          operator: node.operator,
          conductor: node.conductor,
          record_type: node.record_type,
          project_name: node.project_name,
          published_on: '2016-11-16',
          short_summary: node.short_summary,
          short_summary_translation: node.short_summary_en,
          interview_date: '1990-11-16',
          sound_operator: node.sound_operator,
          interviewee_bio: node.interviewee_bio,
          interviewee_bio_translation: node.interviewee_bio_en,
          interviewee_bio_translation_second: node.interviewee_bio_de,
          persons_present: node.persons_present,
          project_location: node.project_location,
          interviewee_photo: node.interviewee_photo,
          interview_duration: parseInt(node.interview_duration, 10),
          interview_location: node.interview_location,
          interviewee_category: node.interviewee_category,
          interviewee_forced_labor_type: node.interviewee_forced_labor_type
        }

        try {
          metaNode.published_on = new Date(node.published_on).toISOString()
        } catch(e) {
          console.log('Invalid published time:', node.published_on)
        }

        try {
          metaNode.interview_date = new Date(node.interview_date).toISOString()
        } catch(e) {
          console.log('Invalid interview time:', node.interview_date)
        }

        if(node.transcripted) metaNode.state = 'transcripted'
        if(node.verified) metaNode.state = 'verified'
        if(node.finished) metaNode.state = 'finished'
        if(node.published) metaNode.state = 'published'

        documentData.nodes.unshift(metaNode)        
      }

    })

    documentData.nodes.unshift(bodyNode)

    entities = uniq(entities)
    subjects = uniq(subjects)

    let annotations = []

    let article = configurator.createArticle();
    let jsonDoc = converter.importDocument(article, documentData);
    let changeset = documentHelpers.getChangeFromDocument(jsonDoc);

    changes[docId] = [changeset]

    documents[docId] = {
      documentId: docId,
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      info: {},
      meta: metaNode,
      version: 1,
      indexedVersion: 0,
      title: metaNode.title,
      language: 'russian',
      annotations: annotations.concat(entities, subjects),
      fullText: fullText,
      updatedAt: metaSource.updated_at,
      updatedBy: defaultUser,
      userId: defaultUser
    }

    // snapshots[docId] = {
    //   '1': {
    //     documentId: docId,
    //     version: 1,
    //     data: documentData,
    //     created: new Date()
    //   }
    // }

  })
  
  let changeStore = configurator.getStore('change')
  let documentStore = configurator.getStore('document')
  let snapshotStore = configurator.getStore('snapshot')
  
  return documentStore.seed(documents)
    .then(function() {
      return changeStore.seed(changes)
    })
    .then(function() {
      return snapshotStore.seed(snapshots)
    })
}

function _fileExists(path) {
  try {
    fs.accessSync(path, fs.F_OK)
    return true
  } catch (e) {
    console.log('Sorry, given file doesn\'t exists:', path)
    return false
  }
}

function _getTimeFromId(id) {
  let timestamp = id.toString().substring(0, 8)
  let date = new Date(parseInt(timestamp, 16) * 1000)
  return date.toISOString()
}

importUsers()
  .then(function() {
    console.log('Users has been imported!')
    return importPersons()
  })
  .then(function() {
    console.log('Persons has been imported!')
    return importLocations()
  })
  .then(function() {
    console.log('Locations has been imported!')
    return importDefinitions()
  })
  .then(function() {
    console.log('Definitions has been imported!')
    return importSubjects()
  })
  .then(function() {
    console.log('Subjects has been imported!')
    return importDocuments()
  })
  .then(function() {
    console.log('Documents has been imported!')
    let indexer = configurator.getEngine('indexer')
    return indexer.indexAll()
  })
  .then(function() {
    console.log('Documents has been reindexed!')
    db.shutdown()
  })
  .catch(function(error) {
    console.error(error)
    db.shutdown()
  })