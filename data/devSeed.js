'use strict';

var DocumentSession = require('substance/model/DocumentSession');
var Configurator = require('../packages/common/ServerConfigurator');
var InterviewPackage = require('../packages/interview/package');

var configurator = new Configurator().import(InterviewPackage);
var seed = configurator.getSeed();
var doc = configurator.createArticle();
var session = new DocumentSession(doc);
var change = session.transaction(seed);
var result = [change.toJSON()];

var testUserChange = result.map(function(c) {
  c.info = {
    userId: 'testuser',
    createdAt: new Date()
  };
  return c;
})[0];

var testUser2Change = result.map(function(c) {
  c.info = {
    userId: 'testuser2',
    createdAt: new Date()
  };
  return c;
})[0];

// App seed
var devSeed = {
  users: {
    'testuser': {
      userId: 'testuser',
      name: 'Test User',
      loginKey: '1234',
      email: 'test@example.com'
    },
    'testuser2': {
      userId: 'testuser2',
      name: 'Test User 2',
      loginKey: '12345',
      email: 'test2@example.com'
    },
    'testuser3': {
      userId: 'testuser3',
      name: '',
      loginKey: '123456',
      email: 'test3@example.com'
    }
  },
  sessions: {
  },
  documents: {
    'interview-1': {
      documentId: 'interview-1',
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      version: 1,
      info: {
        userId: 'testuser',
        title: doc.get(['meta', 'title']),
        updatedAt: new Date()
      }
    },
    'interview-2': {
      documentId: 'interview-2',
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      version: 1,
      info: {
        userId: 'testuser',
        title: doc.get(['meta', 'title']),
        updatedAt: new Date(),
        updatedBy: 'testuser2'
      }
    },
    'interview-3': {
      documentId: 'interview-3',
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      version: 1,
      info: {
        userId: 'testuser',
        title: doc.get(['meta', 'title']),
        updatedAt: new Date()
      }
    },
    'interview-4': {
      documentId: 'interview-4',
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      version: 1,
      info: {
        userId: 'testuser2',
        title: doc.get(['meta', 'title']),
        updatedAt: new Date(),
        updatedBy: 'testuser2'
      }
    },
    'interview-5': {
      documentId: 'interview-5',
      schemaName: 'archivist-interview',
      schemaVersion: '1.0.0',
      version: 1,
      info: {
        userId: 'testuser2',
        title: doc.get(['meta', 'title']),
        updatedAt: new Date()
      }
    },
    'interview-6': {
      documentId: 'interview-6',
      schemaName: 'archivist-intervieww',
      schemaVersion: '1.0.0',
      version: 1,
      info: {
        userId: 'testuser2',
        title: doc.get(['meta', 'title']),
        updatedAt: new Date()
      }
    }
  },
  changes: {
    'interview-1': [testUserChange],
    'interview-2': [testUser2Change],
    'interview-3': [testUser2Change],
    'interview-4': [testUserChange],
    'interview-5': [testUserChange],
    'interview-6': [testUserChange]
  }
};

module.exports = devSeed;