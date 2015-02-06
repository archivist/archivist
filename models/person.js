// The Person entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , backup = require('../controllers/backup.js');

var personSchema = new Schema({
  ,	name: { type: String, index: true }
  , description: String
});

personSchema.set('toJSON', { getters: true, virtuals: true })

var personShadowSchema = new Schema({}, {collection: 'persons_backup', strict: false}),
		personShadow = mongoose.model('personShadow', personShadowSchema);

personSchema.plugin(backup, { shadow: personShadow });

module.exports = mongoose.model('Person', personSchema);