var getDay = function(date) {
  var index = date.getDate();
  var indexStr = index.toString();
  if(indexStr.length > 1) return indexStr;
  return indexStr + '0';
}

var getMonth = function(date) {
  var index = date.getMonth();
  var indexStr = (index + 1).toString();
  if(indexStr.length > 1) return indexStr;
  return '0' + indexStr;
}

var util = {};

util.formatDate = function (pubDate) {
  if (!pubDate) return "N/A";
  var parts = pubDate.split("-");
  if (parts.length >= 3) {
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    // Note: months are 0-based
    var localDate = new Date(parts[0], parts[1]-1, parts[2]);
    var date = getDay(localDate) + '.' + getMonth(localDate) + '.' + localDate.getFullYear();
    return date;
  } else if (parts.length === 2) {
    var month = parts[1].replace(/^0/, "");
    var year = parts[0];
    return MONTH_MAPPING[month]+" "+year;
  } else {
    return year;
  }
};

module.exports = util;