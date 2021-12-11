let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		lang: String,
		messages: [{
			lang: String,
			src: String,
			value: String,
			name: String,
			res_id: Number,
			module: String,
			id: Number,
			state: String
		}]
	});

module.exports.model = mongoose.model('translation', schema, 'translation');
