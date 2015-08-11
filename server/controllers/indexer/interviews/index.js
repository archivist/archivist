var _ = require('underscore'),
		queries = require('./queries'),
		seed = require('./seed'),
		op = require('./op');

module.exports = _.extend(queries, op);

module.exports.seed = seed;