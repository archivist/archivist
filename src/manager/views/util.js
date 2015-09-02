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
          collection.queryParams.query = {};
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
    }
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

    // Persist the query on pagination
    var collection = this.collection, self = this;
    var model = new collection.model();
    var values = model.schema[this.name].options;
    var selectOpts = [{id: "", text: this.placeholder}];
    _.each(values, function(item) {
      selectOpts.push({id: item, text: item});
    });
    this.settings = {
      allowClear: true,
      width: 250,
      placeholder: this.placeholder,
      data: selectOpts,
      theme: "bootstrap"
    }
  },
  template: _.template('<select name="<%- name %>"></select>'),
  search: function (e) {
    if(e) e.preventDefault();
    var value = e.target.value;
    var data = { query: {} };
    var collection = this.collection;
    if(_.isEmpty(value)){
      delete collection.queryParams.query[this.name];
    } else {
      collection.queryParams.query[this.name] = value;
    }

    // go back to the first page on search
    if (Backbone.PageableCollection &&
      collection instanceof Backbone.PageableCollection) {
      collection.getFirstPage({data: data, reset: true, fetch: true});
    } else {
      collection.fetch({data: data, reset: true});
    }
  },
  render: function () {
    var self = this;
    this.$el.empty().append(this.template({
      name: this.name
    })).find('select').select2(this.settings).on('change',function(e){self.search(e)});
    return this;
  }
});
exports.selectFilter = SelectFilter;

var SelectBooleanFilter = Backgrid.Extension.ServerSideFilter.extend({
  className: "backgrid-filter boolean-select",
  initialize: function (options) {
    var self = this;
    Backgrid.Extension.ServerSideFilter.__super__.initialize.apply(this, arguments);
    this.values = options.values || this.values;
    this.placeholder = options.placeholder || this.placeholder;
    this.template = options.template || this.template;

    // Persist the query on pagination
    var collection = this.collection, self = this;
    this.settings = {
      allowClear: true,
      width: 150,
      placeholder: this.placeholder,
      data: this.values,
      theme: "bootstrap"
    }
  },
  template: _.template('<select name="<%- name %>"></select>'),
  search: function (e) {
    if(e) e.preventDefault();
    var field = e.target.value;
    var collection = this.collection;
    if(_.isEmpty(field)){
      _.each(this.values, function(item){
        delete collection.queryParams.query[item.id];
      });
    } else {
      collection.queryParams.query[field] = true;
      _.each(this.values, function(item){
        if(item.id != field) delete collection.queryParams.query[item.id];
      });
    }
    // go back to the first page on search
    if (Backbone.PageableCollection &&
      collection instanceof Backbone.PageableCollection) {
      collection.getFirstPage({reset: true, fetch: true});
    } else {
      collection.fetch({data: data, reset: true});
    }
  },
  render: function () {
    var self = this;
    this.$el.empty().append(this.template({
      name: this.name
    })).find('select').select2(this.settings).on('change',function(e){self.search(e)});
    return this;
  }
});
exports.selectBooleanFilter = SelectBooleanFilter;

var FilterLogic = Backgrid.Extension.ServerSideFilter.extend({
  className: "backgrid-filter form-logic",
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
            var value = self.value;
            if(value){
              return value;
            } else {
              return null;
            }
          };
        }
    },
  search: function (e) {
    if (e) e.preventDefault();
    $(e.target).toggleClass('active');
    var self = this;
    var data = { query: {} };
    data.query = $(e.target).hasClass('active');
    self.value = data.query;
    var collection = this.collection;

    // go back to the first page on search
    if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection) {
          collection.getFirstPage({data: data, reset: true, fetch: true});
    }
    else collection.fetch({data: data, reset: true});
    },
    template: _.template('<button type="button" class="btn btn-default" name="<%- name %>" data-toggle="button"><% if (placeholder) { %><%- placeholder %><% } %></button>', null, {variable: null}),
    render: function () {
      var self = this;
      this.$el.empty().append(this.template({
        name: this.name,
        placeholder: this.placeholder,
        value: this.value,
        type: this.type
      })).find('button').on('click',function(e){self.search(e)});
      this.delegateEvents();
      return this;
    }
});
exports.filterLogic = FilterLogic;

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