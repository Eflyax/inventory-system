let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		name: String,
		display_name: String,
		confirm_message: String,
		fields: Array
	});

module.exports.model = mongoose.model('contactForm', schema, 'contactForm');
