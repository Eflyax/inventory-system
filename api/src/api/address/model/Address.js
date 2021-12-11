const
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		company_name: String,
		cin: String,
		tin: String,
		ltn: String,
		email: String,
		phone: String,
		street: String,
		street2: String,
		zip: String,
		city: String,
		type: String,
		country_code: String,
		state: String,
		is_primary: Boolean,
		user_id: Number
	});

module.exports.model = mongoose.model('address', schema, 'address');
