const
	Review = require('./../model/Review.js');

module.exports = {
	get: function(req, res) {
		Review.model.find({})
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	}
};
