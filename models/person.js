// The Person entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , backup = require('../controllers/backup.js')
  , rest = require('../controllers/rest.js');

var personSchema = new Schema({
  	name: { type: String, index: true }
  , description: String
}, {collection: 'persons'});

personSchema.set('toJSON', { getters: true, virtuals: true })

var personShadowSchema = new Schema({}, {collection: 'persons_backup', strict: false}),
		personShadow = mongoose.model('personShadow', personShadowSchema);

personSchema.plugin(backup, { shadow: personShadow });
personSchema.plugin(rest, { referenceType: 'person_reference', systemCounter: 'persons_db_version' });

module.exports = mongoose.model('Person', personSchema);