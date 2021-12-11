const
	Translation = require('./../model/Translation.js');

module.exports = {
	get: function(req, res) {
		Translation.model.findOne({lang: req.params.locale})
			.then(result => res.send({result: result.messages || []}))
			.catch(error => res.status(404).send({error}));
	}
};
