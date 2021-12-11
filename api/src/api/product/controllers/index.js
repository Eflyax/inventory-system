const
	Search = require('../model/Search.js'),
	Product = require('./../model/Product.js');

module.exports = {
	/**
	 * Search for products by given params
	 */
	getProduct: function(req, res) {
		const
			model = Product.model.find();

		Search.searchByQuery(req, model, modelWithQueries => {
			modelWithQueries.exec((error, products) => {
				if (error) {
					res.status(404).send({error});
				}
				else {
					const
						result = [];

					for (const key in products) {
						result.push(Product.createStub(products[key]));
					}

					res.send({
						result: {
							products: result,
							filters: {
								feature: [],
								attribute: [],
								manufacturer: [],
								price: [],
								category: []
							}
						}
					});
				}
			});
		});
	},
	/**
	 * Get detail of one product and it's variants
	 */
	getProductDetail: function(req, res) {
		Product.model.findOne({id: req.params.id})
			.then(result => res.send({result}))
			.catch(error => res.status(404).send({error}));
	}
};
