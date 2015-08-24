// APICache implementation
// -----------------

var APICache = function(fn, refreshInterval) {
  this.fn = fn;
  this.refreshInterval = refreshInterval;
  this.cachedValue = null;
  this.initialize(function(){})
};

APICache.prototype.initialize = function(cb) {
  this.updateCache(cb);
  // Continue to refresh cache
  setInterval(this.updateCache.bind(this, cb), this.refreshInterval * 60000);
};

APICache.prototype.updateCache = function(cb) {
  var self = this;
  console.log('storing in cache...')
  this.fn(function(err, res) {
    console.log('cache stored')
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

module.exports = APICache;