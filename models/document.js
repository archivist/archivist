// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var documentSchema = new Schema({
  	_schema: [String]
  , nodes: Schema.Types.Mixed
});

documentSchema.set('toJSON', { getters: true, virtuals: true })
 
module.exports = mongoose.model('Document', documentSchema);