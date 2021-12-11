const
	Configuration = require('./../model/Configuration.js');

module.exports = {
	getConfiguration: function (req, res) {
		Configuration.model.findOne({})
			.then(result => res.send(result))
			.catch(error => res.status(400).send({error}));
	}
};
