// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var documentSchema = new Schema({
    id: String
  , _schema: [String]
  , nodes: Schema.Types.Mixed
});
 
module.exports = mongoose.model('Document', documentSchema);