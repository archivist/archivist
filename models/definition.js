// The Definition entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , backup = require('../controllers/backup.js')
  , rest = require('../controllers/rest.js');

var definitionSchema = new Schema({
  	title: { type: String, index: true }
  , description: String
});

definitionSchema.set('toJSON', { getters: true, virtuals: true })

var definitionShadowSchema = new Schema({}, {collection: 'definitions_backup', strict: false}),
		definitionShadow = mongoose.model('definitionShadow', definitionShadowSchema);

definitionSchema.plugin(backup, { shadow: definitionShadow });
definitionSchema.plugin(rest, { referenceType: 'definition_reference', systemCounter: 'defenitions_db_version' });

module.exports = mongoose.model('Defenition', definitionSchema);