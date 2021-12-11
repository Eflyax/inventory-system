let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		attribute_code: String,
		attribute_id: Number,
		default_frontend_label: String,
		default_value: String,
		entity_type_id: Number,
		frontend_input: String,
		frontend_label: String,
		id: Number,
		is_comparable: Boolean,
		is_user_defined: Boolean,
		is_visible: Boolean,
		is_visible_on_front: Boolean
	});

module.exports.model = mongoose.model('attribute', schema, 'attribute');
