var Utility = require('./util.js');

var Location = Utility.model.extend({
  urlRoot: "/api/locations"
})
exports.location = Location

var LocationsToponyms = Utility.collection.extend({
  model: Location,
  url: "/api/locations/toponyms",
  state: {
    pageSize: 20,
    sortKey: "_id",
    order: 1
  }
})
exports.locationsToponyms = LocationsToponyms

var LocationsPrisons = Utility.collection.extend({
  model: Location,
  url: "/api/locations/prisons",
  state: {
    pageSize: 20,
    sortKey: "_id",
    order: 1
  }
})
exports.locationsPrisons = LocationsPrisons