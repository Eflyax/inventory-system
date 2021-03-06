const
	Stock = require('../model/Stock.js');

async function addProductToStock(product, stockId) {
	makeMovement(product, stockId, true);
}

async function removeProductFromStock(product, stockId) {
	makeMovement(product, stockId, false);
}

async function makeMovement(product, stockId, add) {
	const
		stockToUpdate = await Stock.model.findOne({id: stockId}),
		existingItem = stockToUpdate.content.find(item => item.id == product.id),
		indexOfExistingItem = stockToUpdate.content.findIndex(item => item.name === existingItem.name);

	if (existingItem) {
		let totalQuantity = 0;

		product.variants.forEach((variantToUpdate, index) => {
			let
				existingVariant = existingItem.variants.find(variant => variant.name === variantToUpdate.name);

			if (!existingVariant) {
				existingVariant = Object.assign({}, variantToUpdate);
				existingVariant.quantity = 0;

				existingItem.variants.push(existingVariant);
				stockToUpdate.content[indexOfExistingItem] = existingItem;
			}

			existingVariant.quantity = add
				? (parseInt(existingVariant.quantity) + parseInt(variantToUpdate.quantity))
				: (parseInt(existingVariant.quantity) - parseInt(variantToUpdate.quantity));

			if (add) {
				totalQuantity += existingVariant.quantity;
			}
			else {
				totalQuantity -= existingVariant.quantity;
			}
		});
		existingItem.quantity = totalQuantity;
	}
	else {
		let totalQuantity = 0;

		product.variants.forEach(element => {
			if (add) {
				totalQuantity += parseInt(element.quantity);
			}
			else {
				totalQuantity -= parseInt(element.quantity);
			}
		});

		product.quantity = totalQuantity;
		stockToUpdate.content.push(product);
	}

	await Stock.model.updateOne({id: stockId}, {content: stockToUpdate.content});
}

module.exports = {
	addProductToStock,
	removeProductFromStock
};
