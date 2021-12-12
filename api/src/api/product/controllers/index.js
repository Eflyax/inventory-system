const
	Product = require('./../model/Product.js');

module.exports = {
	async getProduct(req, res) {
		const
			query = req.params.id ? {id: req.params.id} : {},
			model = Product.model.find(query),
			products = await model.find({});

		res.send({result: products});
	}
};
