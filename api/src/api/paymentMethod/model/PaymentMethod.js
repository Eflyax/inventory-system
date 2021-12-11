let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		price: String,
		is_available: Boolean
	});

module.exports.model = mongoose.model('paymentMethod', schema, 'paymentMethod');
