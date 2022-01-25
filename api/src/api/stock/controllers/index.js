const
	Stock = require('../model/Stock.js'),
	Transaction = require('../model/Transaction.js'),
	MovementService = require('../model/MovementService.js'),
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
	},
	async getTransaction(req, res) {
		const transactions = await Transaction.model.find();

		console.log(transactions);

		res.send({result: transactions});
	},
	async postTransaction(req, res) {
		console.log({body: req.body});

		const newTransaction = {
			type: req.body.type,
			author: {
				id: req.body.author.id,
				name: req.body.author.name,
				male: req.body.author.male
			},
			movement: {
				id: req.body.movement.id,
				name: req.body.movement.name,
				variants: req.body.movement.variants,
				price: req.body.movement.price
			},
			date: new Date(),
			stockSource: null,
			stockDestination: null
		};

		if (req.body.stockDestinationId) {
			const stock = await Stock.model.findOne({id: req.body.stockDestinationId});

			newTransaction.stockDestination = {
				id: stock.id,
				name: stock.name
			};
		}

		if (req.body.stockSourceId) {
			const stock = await Stock.model.findOne({id: req.body.stockSourceId});

			newTransaction.stockSource = {
				id: stock.id,
				name: stock.name
			};
		}

		await Transaction.model.create(newTransaction);

		console.log({reqTypr: req.body.type});

		switch (req.body.type) {
			case 'buy':
				await MovementService.addProductToStock(newTransaction.movement, req.body.stockDestinationId);
				break;
			case 'sell':
				await MovementService.removeProductFromStock(newTransaction.movement, req.body.stockSourceId);
				break;
			case 'move':
				await MovementService.removeProductFromStock(newTransaction.movement, req.body.stockSourceId);
				await MovementService.addProductToStock(newTransaction.movement, req.body.stockDestinationId);
				break;
			case 'remove':
				await MovementService.removeProductFromStock(newTransaction.movement, req.body.stockSourceId);
				break;
			default:
				console.log('Neimplementovaná akce nic');
		}

		res.send({result: true});
	}
};
