let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: String,
		name: String,
		avatar: String
	});

module.exports.model = mongoose.model('user', schema, 'user');
