const
	// Cart = require('./../../cart/model/Cart'),
	Order = require('./../../order/model/Order'),
	sha1 = require('./../service/sha1'),
	User = require('./../model/User.js');

module.exports = {
	getUser: function(req, res) {
		res.send({result: req.user});
	},
	/**
	 * Preregistration
	 */
	postUser: function(req, res) {
		let
			tokenToSend;

		User.model.find()
			.then(allRecords => {
				const
					token = sha1('token', true),
					tokenRegistration = sha1('tokenRegistration', true),
					item = {
						id: allRecords.length + 1,
						token: token,
						tokenRegistration: tokenRegistration,
						productLists: {
							favorite: {
								id: 0,
								type: '',
								products: [{
									id: 1,
									sequence: 0
								}]
							},
							watchdog: {
								id: 0,
								type: '',
								products: []
							},
							compare: {
								id: 0,
								type: '',
								products: []
							}
						},
						loyalty: {
							points: 200,
							pointsNextLevel: 200,
							level: 1
						},
						...req.body
					};

				tokenToSend = process.env.ONE_STEP_REGISTRATION === 'true' ? token : tokenRegistration;

				return User.model.create(item);
			})
			.then(() => res.send({result: tokenToSend}))
			.catch(error => res.status(404).send({error}));
	},
	patchUser: function(req, res) {
		User.model.updateOne({token: req.user.token}, req.body)
			.then(User.model.findOne({token: req.user.token}))
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	},
	/**
	 * Request to send email with link to reset password
	 */
	postResetPassword: function(req, res) {
		const
			token = sha1('tokenRegistration', true);

		User.model.updateOne({login: req.body.login}, {tokenRegistration: token})
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	},
	/**
	 * Request to reset password with token
	 */
	postResetPasswordReset: function(req, res) {
		const
			newPassword = sha1(req.body.password),
			token = req.body.token,
			update = {
				password: newPassword,
				tokenRegistration: ''
			};

		User.model.findOne({tokenRegistration: token})
			.then(User.model.updateOne({tokenRegistration: token}, update))
			.then(result => {
				res.send({
					result: {
						token: result.token,
						isPublic: false
					}
				});
			})
			.catch(error => res.status(404).send({error}));
	},
	/**
	 * Registration
	 */
	postUserRegister: function(req, res) {
		let
			token;

		if (!req.body.token) {
			res.status(400).send({error: 'Invalid token'});
			return;
		}

		User.model.findOne({tokenRegistration: req.body.token})
			.then(result => {
				if (result) {
					token = sha1('token', true);

					const
						update = {
							token: token,
							password: sha1(req.body.password),
							tokenRegistration: null
						};

					return User.model.updateOne({tokenRegistration: req.body.token}, update);
				}
			})
			.then(result => {
				if (result) {
					res.send({
						code: 200,
						result: {
							token: token,
							is_public: true
						}
					});
					res.send({result});
				}
				else {
					res.status(404).send({error: 'Token not found'});
				}
			})
			.catch(error => res.status(404).send({error}));
	},
	postChangePassword: function(req, res) {
		const
			currentPassword = sha1(req.body.password),
			newPassword = req.body.new_password;

		if (req.user.password === currentPassword) {
			User.model.updateOne({token: req.user.token}, {password: sha1(newPassword)})
				.then(() => res.send({result: true}))
				.catch(error => res.status(404).send({error}));
		}
		else {
			res.status(401).send({error: 'Incorrect current password'});
		}
	},
	postUserLogout: function(req, res) {
		res.send({result: true});
	},
	postUserLogin: function(req, res) {
		const
			login = req.body.login,
			password = sha1(req.body.password);

		User.model.findOne({
			login: login,
			password: password
		})
			.then(result => {
				res.send({
					result: {
						token: result.token,
						is_public: false
					}
				});
			})
			.catch(error => res.status(401).send({error}));
	},
	getUserOrderHistory: function(req, res) {
		const
			identifier = req.params.id;

		// select order by ID (depends on user)
		if (identifier == parseInt(identifier)) {
			Order.model.findOne({
				id: identifier,
				session: req.user.session
			})
				.then(result => res.send({result}))
				.catch(error => res.status(404).send({error}));
		}
		// select by hash (not depending on user)
		else {
			Order.model.findOne({hash: identifier})
				.then(result => res.send({result}))
				.catch(error => res.status(404).send({error}));
		}
	},
	postUserLoginAnonymous: function(req, res) {
		const
			sessionToken = sha1('anonymous', true),
			emptyCart = Cart.create();

		emptyCart.session = sessionToken;

		Cart.model.create(emptyCart)
			.then(() => {
				res.send({result: {
					token: sessionToken,
					is_public: true
				}});
			})
			.catch(error => res.status(404).send({error}));
	}
};
