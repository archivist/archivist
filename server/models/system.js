// The System model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
 
var systemSchema = new Schema({
	name: { type: String, index: true }
}, { strict: false, collection: 'system' });
 
module.exports = mongoose.model('System', systemSchema);