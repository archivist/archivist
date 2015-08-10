var _ = require('underscore');
	queries = require('./queries'),
	seed = require('./seed'),
	op = require('./op');

exports = _.extend(queries, op);

exports.seed = seed;