// The Definition entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , backup = require('../controllers/backup.js')
  , rest = require('../controllers/rest.js')
  , timestamps = require('mongoose-timestamp')
  , util = require('../controllers/util.js')
  , _ = require('underscore');

var definitionSchema = new Schema({
  	title: { type: String, index: true }
  , description: String
  , type: String
  , created: { type: Schema.Types.ObjectId, ref: 'User' }
  , edited: { type: Schema.Types.ObjectId, ref: 'User' }
});

definitionSchema.set('toJSON', { getters: true, virtuals: true })

var definitionShadowSchema = new Schema({}, {collection: 'definitions_backup', strict: false}),
		definitionShadow = mongoose.model('definitionShadow', definitionShadowSchema);

definitionSchema.plugin(backup, { shadow: definitionShadow });
definitionSchema.plugin(rest, { referenceType: 'entity_reference', systemCounter: 'defenitions_db_version' });
definitionSchema.plugin(timestamps);

definitionSchema.statics.search = function(opt, cb) {
  var self = this,
      searchString = opt.query,
      options = util.getOptions(opt),
      query = {
        title: new RegExp(searchString, 'i')
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

module.exports = mongoose.model('Defenition', definitionSchema);