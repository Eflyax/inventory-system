const
	Stock = require('../model/Stock.js'),
	utils = require('./../../utils.js');

module.exports = {
	async getStock(req, res) {
		const
			query = req.params.id ? {id: req.params.id} : {},
			model = Stock.model.find(query),
			stocks = await model.find({});

		res.send({result: stocks});
	},
	async addStock(req, res) {
		req.body.id = utils.generateId();

		await Stock.model.create(req.body)
			.then(result => res.send({result}));
	},
	async updateStock(req, res) {
		delete req.body['_id'];
		delete req.body['__v'];

		await Stock.model.updateOne({id: req.params.id}, req.body)
			.then(async() => {
				const updatedEntity = await Stock.model.findOne({id: req.params.id});

				res.send({result: updatedEntity});
			})
			.catch(err => console.error(err));
	},
	async deleteStock(req, res) {
		Stock.model.deleteOne({id: req.params.id})
			.then(() => res.send({result: true}))
			.catch((err) => res.send({error: err}));
	}
};
