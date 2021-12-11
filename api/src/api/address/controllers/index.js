const
	Address = require('./../model/Address.js');

module.exports = {
	getAddress: function(req, res) {
		const
			id = req.params.id;

		Address.model.findOne({id: id})
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	getAddresses: function(req, res) {
		Address.model.find({})
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	postAddress: function(req, res) {
		req.body.id = new Date().getTime();
		req.body.user_id = req.user.id;

		Address.model.create(req.body)
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	deleteAddress: function(req, res) {
		const
			id = req.params.id;

		Address.model.deleteOne({id: id})
			.then(() => res.send())
			.catch(error => res.status(400).send({error}));
	},
	patchAddress: function(req, res) {
		const
			id = parseInt(req.params.id);

		Address.model.updateOne({id: id}, req.body)
			.then(() => res.send({result: req.body}))
			.catch(error => res.status(400).send({error}));
	},
	postPrimaryAddress: function(req, res) {
		const
			addressId = req.params.id;

		let
			address;

		Address.model.findOne({id: addressId})
			.then(result => {
				if (result) {
					address = result;

					return Address.model.updateMany({
						type: address.type,
						user_id: address.user_id
					}, {
						$set: {
							is_primary: false
						}
					});
				}
			})
			.then(() => {
				if (address) {
					return Address.model.updateOne({id: address.id}, {is_primary: true});
				}
			})
			.then(() => res.send({result: {}}))
			.catch(error => res.status(400).send({error}));
	}
};
