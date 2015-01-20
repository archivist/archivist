// The User model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
 
var userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    picture: String,
    access: {type: Boolean, default: false},
    super: {type: Boolean, default: false}
});
 
module.exports = mongoose.model('User', userSchema);