// The Location entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , textSearch = require('mongoose-text-search')
  , backup = require('../controllers/backup.js')
  , maintenance = require('../controllers/maintenance.js')
  , rest = require('../controllers/rest.js')
  , timestamps = require('mongoose-timestamp')
  , util = require('../controllers/util.js')
  , _ = require('underscore');

var locationSchema = new Schema({
  	type: String
  ,	name: { type: String, index: true }
  , current_name: String
  , synonyms: [{ type: String, index: true }]
  , prison_type: Array
  , nearest_locality: String
  , description: String
  , country: String
  , point: { type: [Number], index: '2dsphere' }
  , created: { type: Schema.Types.ObjectId, ref: 'User' }
  , edited: { type: Schema.Types.ObjectId, ref: 'User' }
});

locationSchema.index({ name: 'text', current_name: 'text', nearest_locality: 'text', synonyms: 'text' }, { default_language: 'russian' });

locationSchema.set('toJSON', { getters: true, virtuals: true })

var locationShadowSchema = new Schema({}, {collection: 'locations_backup', strict: false}),
		locationShadow = mongoose.model('locationShadow', locationShadowSchema);

locationSchema.plugin(backup, { shadow: locationShadow });
locationSchema.plugin(rest, { referenceType: 'location_reference', systemCounter: 'locations_db_version' });
locationSchema.plugin(textSearch);
locationSchema.plugin(timestamps);

locationSchema.statics.search = function(opt, cb) {
  var self = this,
      searchString = opt.query,
      options = util.getOptions(opt),
      query = {
        "$or": [{name: new RegExp(searchString, 'i')},{current_name: new RegExp(searchString, 'i')},{nearest_locality: new RegExp(searchString, 'i')},{synonyms: {"$in": [new RegExp(searchString, 'i')]}}]
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

module.exports = mongoose.model('Location', locationSchema);