const
	Stock = require('../model/Stock.js'),
	Transaction = require('../model/Transaction.js'),
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
			const stock = await Stock.model.findOne({id: req.body.stockSourceId});

			newTransaction.stockDestination = {
				id: stock.id,
				name: stock.name,
				color: stock.color
			};
		}

		if (req.body.stockSourceId) {
			const stock = await Stock.model.findOne({id: req.body.stockSourceId});

			newTransaction.stockSource = {
				id: stock.id,
				name: stock.name,
				color: stock.color
			};
		}

		// console.log({ukladam: newTransaction});

		await Transaction.model.create(newTransaction);

		switch (req.body.type) {
			case 'buy':
				const
					stockToUpdate = await Stock.model.findOne({id: req.body.stockDestination.id}),
					existingItem = stockToUpdate.content.find(item => item.id == req.body.movement.id);

				if (existingItem) { // neexistuje
					let totalQuantity = 0;

					req.body.movement.variants.forEach(variantToUpdate => {
						const existingVariant = existingItem.variants.find(variant => variant.name === variantToUpdate.name);

						existingVariant.quantity = (parseInt(existingVariant.quantity) + parseInt(variantToUpdate.quantity));
						totalQuantity += existingVariant.quantity;
					});
					existingItem.quantity = totalQuantity;
				}
				else {
					let totalQuantity = 0;

					req.body.movement.variants.forEach(element => {
						totalQuantity += parseInt(element.quantity);
					});
					req.body.movement.quantity = totalQuantity;
					stockToUpdate.content.push(req.body.movement);
				}

				await Stock.model.updateOne(
					{id: req.body.stockDestination.id},
					{content: stockToUpdate.content}
				);
				break;
			default:
				console.log('Neimplementovaná akce nic');
		}
		// todo - vložit věc do skladu

		res.send({result: 'ok'});
	}
};
