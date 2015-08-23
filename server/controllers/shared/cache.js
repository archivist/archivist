// APICache implementation
// -----------------

var APICache = function(fn, refreshInterval) {
  this.fn = fn;
  this.refreshInterval;
  this.cachedValue = null;
};

APICache.prototype.initialize = function(cb) {
  this.updateCache(cb);
  // Continue to refresh cache
  setInterval(this.updateCache.bind(this), this.refreshInterval);
};

APICache.prototype.updateCache = function(cb) {
  var self = this;
  this.fn(function(err, res) {
    self.cachedValue = res;
    cb(err);
  });
};

APICache.prototype.get = function(cb) {
  var self = this;
  if (this.cachedValue) {
    cb(null, this.cachedValue);
  } else {
    this.initialize(function() {
      cb(null, self.cachedValue);
    });
  }
};