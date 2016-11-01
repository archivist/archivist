var Document = require('substance').Document;
var DocumentNode = require('substance').DocumentNode;
var ParagraphPackage = require('substance').ParagraphPackage;
var StrongPackage = require('substance').StrongPackage;
var EmphasisPackage = require('substance').EmphasisPackage;

/*
  Archivist Interview model.
*/

class Interview extends Document {
  constructor(...args) {
    super(...args)
    this._initialize()
  }

  _initialize() {
    this.create({
      type: 'container',
      id: 'body',
      nodes: []
    })
  }

  getDocumentMeta() {
    return this.get('meta')
  }

}

class MetaNode extends DocumentNode {}

MetaNode.define({
  type: 'meta',
  title: { type: 'string', default: 'Untitled Interview'},
  short_summary: { type: 'string', default: '' },
  short_summary_translation: { type: 'string', default: '' },
  abstract: { type: 'string', default: '' },
  abstract_translation: { type: 'string', default: '' },
  abstract_translation_second: { type: 'string', default: '' },
  published_on: { type: 'string', default: '' },
  // states: transcripted, verified, finished, published
  state: { type: 'string', default: '' },

  // Project data
  project_name: { type: 'string', default: '' },
  project_location: { type: 'string', default: '' },
  conductor: { type: 'string', default: '' },
  operator: { type: 'string', default: '' },
  sound_operator: { type: 'string', default: '' },
  record_type: { type: 'string', default: '' },
  media_id: { type: 'string', default: '' },
  interview_location: { type: 'string', default: '' },
  interview_date: { type: 'string', default: '' },
  persons_present: { type: 'string', default: '' },
  interview_duration: { type: 'number', default: 0 },

  // Interviewee data
  interviewee_bio: { type: 'string', default: '' },
  interviewee_bio_translation: { type: 'string', default: '' },
  interviewee_bio_translation_second: { type: 'string', default: '' },
  interviewee_category: { type: 'string', default: '' },
  interviewee_forced_labor_type: { type: 'string', default: '' },
  interviewee_photo: { type: 'string', default: '' }

  // TODO: waypoints
  //interviewee_waypoints: { type: ['waypoint'], default: [] }
})

let InterviewSeed = function(tx) {
  let body = tx.get('body');

  tx.create({
    id: 'meta',
    type: 'meta',
    title: 'Untitled Interview'
  });

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: 'Write your interview here.'
  });
  body.show('p1');
};

module.exports = {
  name: 'archivist-interview',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-interview',
      ArticleClass: Interview,
      defaultTextType: 'paragraph'
    });
    config.addNode(MetaNode)
    config.addSeed(InterviewSeed)

    // Import Substance Core packages
    config.import(ParagraphPackage)
    config.import(StrongPackage)
    config.import(EmphasisPackage)
  }
}