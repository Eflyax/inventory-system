const
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number | String,
		date: Date,
		type: String,
		author: Object,
		movement: Object,
		note: String
	});

module.exports = {
	model: mongoose.model('transaction', schema, 'transaction')
};
