let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		code: String,
		name: String
	});

module.exports.model = mongoose.model('country', schema, 'country');
