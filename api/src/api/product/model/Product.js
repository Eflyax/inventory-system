const
	_ = require('lodash'),
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		id: Number,
		product_id: Number, // variant only
		slug: Array,
		price: { // variant only
			price: Number,
			original_price: Number,
			percent_discount: Number,
			show_discount: Boolean
		},
		image_urls: Array, // variant only
		badges: Array, // variant only
		stock: { // variant only
			in_stock: Boolean,
			total_available_quantity: Number,
			mode: String,
			locations: Array
		},
		barcode: String, // variant only
		sku: String, // variant only
		attributes: Array, // variant only
		name: String, // product only
		summary: String, // product only
		unit: String, // product only
		free_shipping: Boolean, // product only
		type: String, // product only
		variants: Array, // product only
		description: String, // product only
		files: Array, // product only
		manufacturer: Object, // product only
		features: Array, // product only
		alternative_products: Array, // product only
		suggested_products: Array, // product only
		common_content: Array // product only
	}),
	createStub = (product) => {
		const
			stubFieldsProduct = [
				'id',
				'name',
				'summary',
				'unit',
				'free_shipping',
				'type',
				'badges',
				'slug',
			],
			stubFieldsVariant = [
				'id',
				'product_id',
				'price',
				'image_urls',
				'stock',
			],
			productStub = _.pick(product, stubFieldsProduct);

		productStub.variants = [];

		for (const key in product.variants) {
			const variantStub = _.pick(product.variants[key], stubFieldsVariant);

			productStub.variants.push(variantStub);
		}

		return productStub;
	};

module.exports = {
	model: mongoose.model('product', schema, 'product'),
	createStub
};
