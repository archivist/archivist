// The Person entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , backup = require('../controllers/backup.js')
  , rest = require('../controllers/rest.js')
  , timestamps = require('mongoose-timestamp')
  , util = require('../controllers/util.js')
  , _ = require('underscore');

var personSchema = new Schema({
  	name: { type: String, index: true }
  , description: String
  , global: Boolean
  , created: { type: Schema.Types.ObjectId, ref: 'User' }
  , edited: { type: Schema.Types.ObjectId, ref: 'User' }
}, {collection: 'persons'});

personSchema.set('toJSON', { getters: true, virtuals: true })

var personShadowSchema = new Schema({}, {collection: 'persons_backup', strict: false}),
		personShadow = mongoose.model('personShadow', personShadowSchema);

personSchema.plugin(backup, { shadow: personShadow });
personSchema.plugin(rest, { referenceType: 'person_reference', systemCounter: 'persons_db_version' });
personSchema.plugin(timestamps);

personSchema.statics.search = function(opt, cb) {
  var self = this,
      searchString = opt.query,
      options = util.getOptions(opt),
      query = {
        name: new RegExp(searchString, 'i')
      };

  if(_.isEmpty(options.limit)) options.limit = 30;
  if(_.isEmpty(options.sort)) {
    options.sort = {
      'updatedAt': -1
    }
  }

  self.count(query, function(err, count) {
    self.find(query, {}, options, function(err, records) {
      cb(err, records, count);
    });
  })
}

module.exports = mongoose.model('Person', personSchema);