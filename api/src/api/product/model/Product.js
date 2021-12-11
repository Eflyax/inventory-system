const
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		price: {
			price: Number,
			purchasePrice: Number
		},
		icon: String,
		variants: Array,
		quantity: Number
	});

module.exports = {
	model: mongoose.model('product', schema, 'product')
};
