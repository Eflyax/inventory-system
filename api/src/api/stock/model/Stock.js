const
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		icon: String,
		color: String,
		content: Array
	});

module.exports = {
	model: mongoose.model('stock', schema, 'stock')
};
