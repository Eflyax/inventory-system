const
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number | String,
		date: Date,
		type: String,
		author: Object,
		movement: Object,
		note: String,
		stockSource: Object,
		stockDestination: Object
	});

module.exports = {
	model: mongoose.model('transaction', schema, 'transaction')
};
