let
	cartRawSchema = require('./../../cart/model/Cart').cartRawSchema,
	orderSchema = {
		...cartRawSchema,
		order_date: String,
		cancel_date: String,
		delivery_status: String,
		public_hash: String,
		payment: Object,
		note: String
	},
	mongoose = require('mongoose'),
	schema = mongoose.Schema(orderSchema);

module.exports = {
	model: mongoose.model('order', schema, 'order')
};
