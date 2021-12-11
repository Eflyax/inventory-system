const
	Order = require('./../../order/model/Order.js');

module.exports = {
	getOrderConfirmed: function(req, res) {
		Order.model.findOne({public_hash: req.params.hash})
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	}
};
