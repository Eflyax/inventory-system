let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		type: String,
		category_id: Number,
		page_id: Number,
		product_id: Number,
		url: String,
		parent_id: Number,
		sequence: Number,
		published: Boolean
	});

module.exports = {
	model: mongoose.model('menu', schema, 'menu')
};
