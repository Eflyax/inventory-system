const
	Cart = require('./cart/model/Cart.js'),
	User = require('./user/model/User.js'),
	sessionMiddleware = (req, res, next) => {
		const
			session = req.headers['authorization'].replace('Bearer ', '');

		if (session) {
			let
				cart;

			Cart.model.findOne({session: session})
				.then(User.model.findOne({token: session}))
				.then(result => {
					if (result) {
						req.cart = result;
						next();
					}
					else {
						cart = Cart.create();
						cart.session = session;

						return Cart.model.create(cart);
					}
				})
				.then(result => {
					if (result) {
						req.cart = cart;
						next();
					}
				})
				.catch(error => res.status(404).send({error}));
		}
		else {
			res.status(403).send({error: 'unauthorized'});
		}
	};

module.exports = sessionMiddleware;
