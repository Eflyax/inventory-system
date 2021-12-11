const
	Page = require('./../model/Page.js');

module.exports = {
	get: function(req, res) {
		Page.model.find()
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	getRecord: function(req, res) {
		const
			{id, slug} = req.params;

		if (id) {
			Page.model.findOne({id})
				.then(result => res.send({result}))
				.catch(error => res.status(400).send({error}));
		}
		else if (slug) {
			Page.model.findOne({'slug.value': slug})
				.then(result => res.send({result}))
				.catch(error => res.status(400).send({error}));
		}
		else {
			res.sendStatus(404);
		}
	},
	getHomepage: function(req, res) {
		Page.model.findOne({homepage: true})
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	post: function(req, res) {
		req.body.id = new Date().getTime();

		Page.model.create(req.body)
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	},
	postHomepage: function(req, res) {
		const
			{id} = req.body;

		Page.model.updateOne({homepage: true}, {homepage: false})
			.then(() => Page.model.updateOne({id}, {homepage: true}))
			.then(() => res.send())
			.catch(error => res.status(400).send({error}));
	},
	patch: function(req, res) {
		const
			id = req.params.id,
			body = req.body;

		Page.model.updateOne({id}, body)
			.then(() => res.send({result: body}))
			.catch(error => res.status(400).send({error}));
	},
	delete: function(req, res) {
		const
			id = req.params.id;

		Page.model.deleteOne({id})
			.then(() => res.send())
			.catch(error => res.status(400).send({error}));
	}
};
