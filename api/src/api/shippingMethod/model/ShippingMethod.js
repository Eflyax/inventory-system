let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		name: String,
		widget_type: String,
		price: String,
		is_available: Boolean,
		expedition_delay_days: Number,
		available_payment_methods: Array,
		additional_data: Object
	});

module.exports.model = mongoose.model('shippingMethod', schema, 'shippingMethod');
