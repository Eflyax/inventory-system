const
	User = require('./user/model/User.js'),
	authMiddleware = (req, res, next) => {
		let
			token = req.headers['authorization'];

		if (token) {
			token = token.replace('Bearer ', '');
			User.model.findOne({token: token})
				.then(result => {
					if (result) {
						req.user = result;
						next();
					}
					else {
						res.status(401).send({error: 'Unauthorized'});
					}
				})
				.catch(error => res.status(400).send({error}));
		}
		else {
			res.status(401).send({error: 'unauthorized'});
		}
	};

module.exports = authMiddleware;
