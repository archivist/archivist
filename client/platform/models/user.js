var Backbone = require('backbone')
  , Utility = require('./util.js')
  , Notify = require('../local_modules/notify/notify.js')

var User = Utility.model.extend({
	 initialize: function () {
    Backbone.Model.prototype.initialize.apply(this, arguments);
    this.on("change", function (model, options) {
      if (options && options.save === false) return;
      model.save();
    });
    var that = this;
    this.on('request', function(model, req, options) {
      Notify.spinner('show');
      req.done(function(){
        Notify.spinner('hide');
        Notify.info('Users data has been saved');
      })
    })
  },
  urlRoot: "/api/users"
})
exports.user = User

var Users = Utility.collection.extend({
  model: User,
  url: "/api/users",
  state: {
    pageSize: null,
    sortKey: "_id",
    order: 1
  }
})
exports.users = Users