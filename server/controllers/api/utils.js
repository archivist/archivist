var System = require('../models/system.js')
  , _ = require('underscore');

exports.getQuery = function(query) {
  if(query){
    if(query instanceof Object){
      try {
        for (var props in query) {
          if(query[props] != 'null') {
            query[props] = JSON.parse(query[props]);
          } else {
            delete query[props];
          }
        }
      }
      catch(e) {
      }
    }
    return query;
  } else {
    return {};
  }
}

exports.getOptions = function(query) {
  var options = {sort:{},skip:'',limit:''};
  if(query.sort_by && query.order) {
    options.sort[query.sort_by] = query.order;
  }
  if(query.page && query.per_page) {
    options.skip = (query.page - 1)*query.per_page;
    options.limit = query.per_page;
  } else if (query.page && query.page_limit) {
    options.skip = (query.page - 1)*query.page_limit;
    options.limit = query.page_limit;
  }
  return options;
}

exports.reduceQuery = function(query, obj) {
  if(_.isUndefined(query)) {
    query = obj;
  } else {
    query = _.extend(query, obj);
  }
  return query;
}

/* System variables API */

/**
 * Set system variable
 *
 * @param {string} name - The unique name of variable
 * @param {string} value - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

exports.setSystemVariable = function(name, value, cb) {
  System.findOneAndUpdate({name: name}, { $set: value }, {new: true, upsert: true}, function(err, variable) {
    cb(err, variable);
  });
}

/**
 * Get system variable
 *
 * @param {string} name - The unique name of variable
 * @param {callback} cb - The callback that handles the results 
 */

exports.getSystemVariable = function(name, cb) {
  System.findOne({name: name}, function(err, variable) {
    cb(err, variable);
  });
}