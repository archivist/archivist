var _ = require('underscore'),
		queries = require('./queries'),
		op = require('./op');

module.exports = _.extend(queries, op);