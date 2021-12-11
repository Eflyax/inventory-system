const
	Stock = require('../model/Stock.js');

module.exports = {
	/**
	 * Search for products by given params
	 */
	getStocks: function(req, res) {
		const
			model = Stock.model.find();

		res.send({});
	}
};
