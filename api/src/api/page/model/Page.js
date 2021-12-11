let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		published: Boolean,
		title: String,
		slug: Array,
		description: String,
		author: String,
		homepage: Boolean
	});

module.exports = {
	model: mongoose.model('page', schema, 'page')
};
