const
	User = require('./../model/User.js');

module.exports = {
	getUsers: async(req, res) => {
		const users = await User.model.find();

		res.send({result: users});
	},
	patchUser: async(req, res) => {
		await User.model.updateOne({id: req.params.id}, req.body);

		res.send({result: true});
	}
};
