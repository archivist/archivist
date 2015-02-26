// The Location entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , backup = require('../controllers/backup.js')
  , maintenance = require('../controllers/maintenance.js')
  , rest = require('../controllers/rest.js');

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
});

locationSchema.set('toJSON', { getters: true, virtuals: true })

var locationShadowSchema = new Schema({}, {collection: 'locations_backup', strict: false}),
		locationShadow = mongoose.model('locationShadow', locationShadowSchema);

locationSchema.plugin(backup, { shadow: locationShadow });
locationSchema.plugin(rest, { referenceType: 'location_reference', systemCounter: 'locations_db_version' });


module.exports = mongoose.model('Location', locationSchema);