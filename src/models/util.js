var Backbone = require('backbone')
  , Paginator = require('backbone.paginator')
  , nprogress = require('nprogress');

nprogress.configure({minimum: 0.1, showSpinner: false, speed: 1000});

var Model = Backbone.Model.extend({
  	idAttribute: '_id'
});
exports.model = Model;

var Collection = Backbone.PageableCollection.extend({
  mode: 'server',
  initialize: function(models, options) {
    var self = this;
    self.on('request', function(){
      nprogress.start();
      Backbone.middle.trigger("load:start");
    });
    self.on('sync', function(){
      nprogress.done();
      Backbone.middle.trigger("load:finish");
    });
    self.on('error', function(){
      nprogress.done();
      Backbone.middle.trigger("sync:fail", 'Something goes wrong, try again');
    });
    Backbone.PageableCollection.__super__.initialize.apply(this, arguments)
  },
	state: {
  	pageSize: 20,
  	sortKey: "name",
  	order: -1,
	},
	queryParams: {
		currentPage: "page",
		pageSize:	"per_page",
		totalPages:	"total_pages",
		totalRecords: "total_entries",
		sortKey: "sort_by",
    query: {}
	}
});
exports.collection = Collection;