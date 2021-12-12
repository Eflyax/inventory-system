const
	Product = require('./../model/Product.js');

module.exports = {
	getProduct: async(req, res) => {
		const
			model = Product.model.find(),
			products = await model.find({});

		res.send({result: products});
	}
};
