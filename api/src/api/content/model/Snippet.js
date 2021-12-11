let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		res_id: Number,
		snippet_type: String,
		uuid: String,
		parent_uuid: String,
		content: String,
		sequence: Number
	});

module.exports.model = mongoose.model(
	'snippet',
	schema,
	'snippet'
);
