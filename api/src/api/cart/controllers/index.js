const
	Address = require('./../../address/model/Address.js'),
	Cart = require('./../model/Cart.js'),
	Country = require('./../../country/model/Country.js'),
	PaymentMethod = require('./../../paymentMethod/model/PaymentMethod.js'),
	Order = require('./../../order/model/Order.js'),
	Product = require('./../../product/model/Product.js'),
	sha1 = require('./../../user/service/sha1'),
	ShippingMethod = require('./../../shippingMethod/model/ShippingMethod.js'),
	User = require('./../../user/model/User.js');

module.exports = {
	/**
	 * Get current cart.
	 */
	getCart: function(req, res) {
		res.send({
			result: req.cart
		});
	},
	/**
	 *	Add new product to the cart.
	 *	Increases the amount of product if already in cart.
	 *	Creates new cart if no order exists for current (anonymous) user.
	 */
	postCartLine: async function(req, res) {
		const
			variantPublicId = req.body.p_id,
			existingItem = req.cart.lines.find(line => line.p_id == variantPublicId);

		if (existingItem) {
			existingItem.quantity += parseInt(req.body.quantity);

			res.send({
				result: {
					cart: await Cart.recalculate(req.cart),
					new_line: existingItem
				}
			});
		}
		else {
			Product.model.findOne({'variants.id': variantPublicId})
				.then(async(result) => {
					const
						product = result,
						emptyLine = Cart.createLine(product.id, variantPublicId),
						variant = product.variants.find(variant => variant.id === variantPublicId);

					emptyLine.line_id = new Date().getTime();
					emptyLine.quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;
					emptyLine.p_id = variantPublicId;

					if (product) {
						emptyLine.line_id = new Date().getTime();
						emptyLine.name = product.name;
						emptyLine.price_unit = variant.price.price;
						emptyLine.price_total = (variant.price.price * emptyLine.quantity);
						emptyLine.price_subtotal = (variant.price.price_excl_tax * emptyLine.quantity);
						emptyLine.price_tax = (variant.price.price - variant.price.price_excl_tax) * emptyLine.quantity;
						emptyLine.product.slug = product.slug;
						emptyLine.quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;

						req.cart.lines.push(emptyLine);
						req.cart.lines = req.cart.lines.filter(line => line.quantity > 0);

						res.send({
							result: {
								cart: await Cart.recalculate(req.cart),
								new_line: emptyLine
							}
						});
					}
					else {
						res.status(404).send({error: 'product not found'});
					}
				})
				.catch(error => res.status(400).send({error}));
		}
	},
	/**
	 * Edit line with given id for the current order.
	 */
	patchCartLine: async function(req, res) {
		const
			lineId = req.params.id,
			lineToUpdateIndex = req.cart.lines.findIndex(item => item.line_id == lineId);

		if (!req.cart.lines[lineToUpdateIndex]) {
			res.status(404).send({error: 'not found'});
			return;
		}
		req.cart.lines[lineToUpdateIndex].quantity = parseInt(req.body.quantity);
		req.cart.lines = req.cart.lines.filter(line => line.quantity > 0);

		res.send({
			result: await Cart.recalculate(req.cart)
		});
	},
	/**
	 * Delete line with given id for the current order.
	 */
	deleteCartLine: async function(req, res) {
		const
			lineId = req.params.id;

		req.cart.lines = req.cart.lines.filter(line => line.line_id != lineId);
		res.send({result: await Cart.recalculate(req.cart)});
	},
	/**
	 * Returns available addresses for the current order.
	 */
	getCartAddresses: function(req, res) {
		const
			cart = req.cart;

		User.model.findOne({token: cart.session})
			.then(result => {
				if (result) {
					return Address.model.find({user_id: result.id});
				}
			})
			.then(result => {
				if (result) {
					res.send({result});
				}
				else {
					res.sendStatus(204);
				}
			})
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Returns available countries for the current order.
	 */
	getCartAddressesCountries: function(req, res) {
		Country.model.find({})
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Set data for invoice address for the current order.
	 */
	postCartAddressInvoice: function(req, res) {
		Cart.model.updateOne({session: req.cart.session}, {invoice_address: req.body})
			.then(() => {
				req.cart.invoice_address = req.body;
				res.send({result: req.cart});
			})
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Set data for delivery address for the current order.
	 */
	postCartAddressDelivery: function(req, res) {
		Cart.model.updateOne({session: req.cart.session}, {shipping_address: req.body})
			.then(() => {
				req.cart.shipping_address = req.body;
				res.send({result: req.cart});
			})
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Get list of shipping methods and their (in)availability for the current order.
	 */
	getCartShippingMethods: function(req, res) {
		ShippingMethod.model.find({})
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Select given shipping method as the shipping method for the current order.
	 */
	postCartShipping: function(req, res) {
		const
			methodId = req.body.p_id;

		let
			shippingMethod;

		ShippingMethod.model.findOne({id: methodId})
			.then(result => {
				shippingMethod = result;
				return Cart.model.updateOne({session: req.cart.session}, {shipping_method: shippingMethod});
			})
			.then(() => {
				req.cart.shipping_method = shippingMethod;
				res.send({result: req.cart});
			})
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Get list of payment methods and their (in)availability for the current order.
	 */
	getCartPaymentMethods: function(req, res) {
		const currentShippingMethod = req.cart.shipping_method;

		PaymentMethod.model.find({})
			.then(result => {
				let
					resultPaymentMethods = [];

				if (!currentShippingMethod) {
					resultPaymentMethods = result;
				}
				else {
					result.forEach(method => {
						method.is_available = currentShippingMethod.available_payment_methods.includes(method.id);
						resultPaymentMethods.push(method);
					});
				}

				res.send({
					result: resultPaymentMethods
				});
			})
			.catch(error => res.status(400).send({error}));
	},
	/**
	 * Select given payment method as the payment method for the current order.
	 */
	postCartPayment: function(req, res) {
		const
			paymentId = req.body.p_id;

		let
			payment;

		if (!paymentId) {
			res.status(403).send({error: 'missing payment id'});
			return;
		}

		if (!req.cart.shipping_method) {
			res.status(403).send({error: 'cannot set payment to cart without delivery method'});
			return;
		}

		if (req.cart.shipping_method.available_payment_methods.includes(paymentId)) {
			PaymentMethod.model.findOne({id: paymentId})
				.then(result => {
					payment = result;
					return Cart.model.updateOne({session: req.cart.session}, {payment_method: payment});
				})
				.then(() => {
					req.cart.payment_method = payment;
					res.send({result: req.cart});
				})
				.catch(error => res.status(403).send({error}));
		}
		else {
			res.status(403).send({error: 'requested payment is not available for set delivery method'});
		}
	},
	/**
	 * Finalize order
	 */
	postCartConfirm: function(req, res) {
		const
			uniqueHash = sha1('orderHash', true),
			order = Object.assign({}, {
				...req.cart._doc,
				...req.body
			});

		delete order['__v'];
		delete order['_id'];

		order.public_hash = uniqueHash;

		Order.model.create(order)
			.then(() => res.send({result: order}))
			.catch(error => res.status(400).send({error}));
	}
};
