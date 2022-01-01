const
	Product = require('./../model/Product.js'),
	utils = require('./../../utils.js');

module.exports = {
	async getProduct(req, res) {
		const
			query = req.params.id ? {id: req.params.id} : {},
			model = Product.model.find(query),
			products = await model.find({});

		res.send({result: products});
	},
	async addProduct(req, res) {
		req.body.id = utils.generateId();

		await Product.model.create(req.body)
			.then(result => res.send({result}));
	},
	async searchProduct(req, res) {
		let result = [];

		const
			onlyInStock = !!req.query.stock,
			term = req.query.term;

		if (!onlyInStock) {
			result = await Product.model.find({
				name: {
					$regex: '.*' + term + '.*',
					$options: 'i'
				}}).limit(10);
		}
		else {
			console.log('tuto nechci');
			// todo
		}

		res.send({result});
	},
	async updateProduct(req, res) {
		delete req.body['_id'];
		delete req.body['__v'];

		await Product.model.updateOne({id: req.params.id}, req.body)
			.then(async() => {
				const updatedEntity = await Product.model.findOne({id: req.params.id});

				res.send({result: updatedEntity});
			})
			.catch(err => console.error(err));
	},
	async deleteProduct(req, res) {
		Product.model.deleteOne({id: req.params.id})
			.then(() => res.send({result: true}))
			.catch((err) => res.send({error: err}));
	}
};
