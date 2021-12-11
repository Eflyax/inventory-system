const
	Attribute = require('./../model/Attribute.js');

module.exports = {
	get: function(req, res) {
		Attribute.model.find({})
			.then(result => res.send({result}))
			.catch(error => res.status(400).send({error}));
	}
};
