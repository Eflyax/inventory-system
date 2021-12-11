const
	Product = require('./../../product/model/Product'),
	Category = require('./../../category/model/Category'),
	Search = require('../../product/model/Search.js');

module.exports = {
	search: function(req, res) {
		const
			modelProduct = Product.model.find(),
			modelCategory = Category.model.find(),
			result = {
				product: [],
				category: []
			};

		Search.searchByQuery(req, modelProduct, modelWithProductQueries => {
			modelWithProductQueries.exec((error, products) => {
				if (error) {
					res.status(404).send({error});
				}
				else {
					products.forEach(product => {
						result.product.push({
							identifier: 'product|' + product.id,
							...product._doc
						});
					});

					Search.searchByQuery(req, modelCategory, modelWithCategoryQueries => {
						modelWithCategoryQueries.exec((error, categories) => {
							if (error) {
								res.status(404).send({error});
							}
							else {
								categories.forEach(category => {
									result.category.push({
										identifier: 'category|' + category.id,
										...category._doc
									});
								});

								res.send({
									result: {
										product: result.product,
										category: result.category
									}
								});
							}
						});
					});
				}
			});
		});
	}
};
