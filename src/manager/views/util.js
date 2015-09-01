var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    filters = require('backgrid-filter'),
    $ = require('jquery'),
    _ = require('underscore'),
    Grid = require('./grid.js');

var Filter = Backgrid.Extension.ServerSideFilter.extend({
  className: "backgrid-filter form-search animate",
  initialize: function (options) {
      Backgrid.Extension.ServerSideFilter.__super__.initialize.apply(this, arguments);
      this.name = options.name || this.name;
      this.placeholder = options.placeholder || this.placeholder;
      this.template = options.template || this.template;

      // Persist the query on pagination
      var collection = this.collection, self = this;
      if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection &&
          collection.mode == "server") {
          if(_.isUndefined(collection.queryParams.query)) {
          collection.queryParams.query = {};
        }
          collection.queryParams.query[this.name] = function () {
            var value = self.searchBox().val();
            if(!_.isEmpty(value)){
              return JSON.stringify({ $regex: value, $options: 'i' });
            } else {
              return null;
            }
          };
        }
    },
  search: function (e) {
    if (e) e.preventDefault();

    var data = { query: {} };
    data.query = JSON.stringify({ $regex: this.searchBox().val(), $options: 'i' });

    var collection = this.collection;
    // go back to the first page on search
    if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection) {
          collection.getFirstPage({data: data, reset: true, fetch: true});
    }
    else collection.fetch({data: data, reset: true});
    },
});
exports.filter = Filter

var SelectFilter = Backgrid.Extension.ServerSideFilter.extend({
  className: "backgrid-filter form-select",
  initialize: function (options) {
      var self = this;
      Backgrid.Extension.ServerSideFilter.__super__.initialize.apply(this, arguments);
      this.name = options.name || this.name;
      this.placeholder = options.placeholder || this.placeholder;
      this.template = options.template || this.template;
      this.type = options.type || this.type;
      var colUrl = this.collection.url.split( '/' ),
        colName = colUrl[colUrl.length - 1];

      // Persist the query on pagination
      var collection = this.collection, self = this;
      this.settings = {
        allowClear: true,
        width: 220,
        placeholder: this.placeholder,
        data: [{ id: "true", text: 'Published' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }]
      }
      if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection &&
          collection.mode == "server") {
          if(_.isUndefined(collection.queryParams.query)) {
          collection.queryParams.query = {};
        }
          collection.queryParams.query[this.name] = function () {
            var data = self.$el.find('select').select2('data');
            debugger
           
            if(_.isArray(data)) {
              var values = _.pluck(data,'id');
            } else {
              var values = '';
            }
            
            if(!_.isEmpty(values)){
              return JSON.stringify({ $in: values });
            } else {
              return null;
            }
          };
        }
  },
  template: _.template('<select data-placeholder="<%- placeholder %>" name="<%- name %>"></select>'),
    search: function (e) {
      if (e) e.preventDefault();
      var values = e.val;
    var data = { query: {} };
    data.query = JSON.stringify({ $in: values });
    var collection = this.collection;

    // go back to the first page on search
    if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection) {
          collection.getFirstPage({data: data, reset: true, fetch: true});
    }
    else collection.fetch({data: data, reset: true});
    },
  render: function () {
    var self = this;
      this.$el.empty().append(this.template({
          name: this.name,
          placeholder: this.placeholder
      })).find('select').select2(this.settings).on('change',function(e){self.search(e)});
      return this;
  }
});
exports.selectFilter = SelectFilter;

var isSuper = function() {
  var session = Backbone.AppRouter.session;
  var claims = session.token.split('.')[1];
  claims = JSON.parse(atob(claims));
  return _.contains(claims.scopes, "super");
}
exports.isSuper = isSuper;

var getUserData = function() {
  var session = Backbone.AppRouter.session;
  return session.user;
}
exports.getUserData = getUserData;

var getUserToken = function() {
  var session = Backbone.AppRouter.session;
  return session.token;
}
exports.getUserToken = getUserToken;