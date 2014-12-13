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