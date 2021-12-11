let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		login: String,
		admin: Boolean,
		is_company: Boolean,
		company_name: String,
		loyalty: Object,
		productList: Object,
		id: Number,
		default_shipping: Number,
		default_invoice: Number,
		email: String,
		phone: String,
		first_name: String,
		last_name: String,
		addresses: Array,
		birth_date: String,
		token: String,
		tokenRegistration: String,
		password: String,
		zip: String,
		city: String,
		street_address: String,
		country: String
	});

module.exports.model = mongoose.model('user', schema, 'user');
