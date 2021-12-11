let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		slug: Array,
		icon_url: String,
		social_image_url: String,
		parent: Object,
		children: Array,
		common_content: Array
	});

module.exports.model = mongoose.model(
	'category',
	schema,
	'category'
);
