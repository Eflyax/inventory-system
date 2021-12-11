let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		created_at: String,
		customer_id: String | Number,
		detail: String,
		id: Number,
		nickname: String,
		product_id: String | Number,
		ratings: [{
			percent: Number,
			title: String,
			value: Number
		}],
		review_status: Number,
		slug: String,
		title: String,
		tsk: Number
	});

module.exports.model = mongoose.model('review', schema, 'review');
