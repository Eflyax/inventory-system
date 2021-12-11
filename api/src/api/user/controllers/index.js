const
	User = require('./../model/User.js');

module.exports = {
	getUsers: async(req, res) => {
		const users = await User.model.find();

		res.send({result: users});
	}
};
