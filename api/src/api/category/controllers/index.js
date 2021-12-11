const
	Category = require('./../model/Category.js');

module.exports = {
	get: function(req, res) {
		let
			query = {};

		if (req.query.id) {
			query.id = {$in: req.query.id.split(',')};
		}

		Category.model.find(query)
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	},
	getRecord: function(req, res) {
		const
			id = req.params.id;

		Category.model.findOne({id})
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	}
};
