let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: String,
		name: String,
		avatar: Object,
		male: Boolean
	});

module.exports.model = mongoose.model('user', schema, 'user');
