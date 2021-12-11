let
	mongoose = require('mongoose'),
	cartRawSchema = {
		price_total: Number,
		price_subtotal: Number,
		price_tax: Number,
		invoice_address: Object,
		shipping_address: Object,
		lines: Array,
		session: String,
		payment_method: Object,
		shipping_method: Object,
		hash: String,
		user_id: Number | null
	},
	schema = mongoose.Schema(cartRawSchema),
	model = mongoose.model('cart', schema, 'cart'),
	create = () => {
		return {
			price_total: 0,
			price_subtotal: 0,
			price_tax: 0,
			invoice_address: null,
			shipping_address: null,
			lines: [],
			session: '',
			payment_method: null,
			shipping_method: null,
			hash: '',
			user_id: null
		};
	},
	createLine = (productPublicId, variantPublicId) => {
		return {
			line_id: 0,
			product: {
				id: productPublicId,
				slug: [{
					lang: '',
					value: ''
				}],
				variant_id: variantPublicId,
				variant_slug: [{
					lang: '',
					value: ''
				}]
			},
			name: '',
			sequence: productPublicId,
			price_unit: 0,
			price_total: 0,
			price_subtotal: 0,
			price_tax: 0,
			discount: 0,
			tax_name: 'DPH 21%',
			quantity: 0,
			uom_name: 'Unit(s)'
		};
	},
	recalculate = (cart) => {
		let update = {
			price_total: 0,
			price_subtotal: 0,
			price_tax: 0
		};

		cart.lines.forEach(line => {
			let
				quantity = line.quantity,
				priceUnit = line.price_unit;

			update.price_total += priceUnit * quantity;
			update.price_subtotal += line.price_subtotal * quantity;
			update.price_tax += line.price_tax * quantity;
		});

		update.price_total = update.price_total || 0;
		update.price_subtotal = update.price_subtotal || 0;
		update.price_tax = update.price_tax || 0;
		update.lines = cart.lines;

		return model.updateOne({session: cart.session}, update)
			.then(() => model.findOne({session: cart.session}))
			.catch(err => console.error(err));
	};

module.exports = {
	model: model,
	create,
	createLine,
	cartRawSchema,
	recalculate
};
