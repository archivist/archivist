var host = process.env.ES_HOST || 'http://localhost:9200';

var config = {
  // Elastic Search host
  host: host,
};

module.exports = config;