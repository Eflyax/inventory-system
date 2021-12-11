const
	Address = require('./../address/model/Address.js'),
	Attribute = require('./../attribute/model/Attribute.js'),
	Cart = require('./../cart/model/Cart.js'),
	Category = require('./../category/model/Category.js'),
	Configuration = require('./../configuration/model/Configuration.js'),
	Country = require('./../country/model/Country.js'),
	fs = require('fs'),
	ContactForm = require('./../contactForm/model/ContactForm.js'),
	MenuItem = require('./../menu/model/MenuItem.js'),
	mongoose = require('mongoose'),
	Order = require('./../order/model/Order.js'),
	Page = require('./../page/model/Page.js'),
	PaymentMethod = require('./../paymentMethod/model/PaymentMethod.js'),
	Product = require('./../product/model/Product.js'),
	Review = require('./../review/model/Review.js'),
	ShippingMethod = require('./../shippingMethod/model/ShippingMethod.js'),
	Snippet = require('./../content/model/Snippet.js'),
	Translation = require('./../translation/model/Translation.js'),
	User = require('./../user/model/User.js'),
	mapDumpToModel = {
		attribute: Attribute.model,
		address: Address.model,
		review: Review.model,
		configuration: Configuration.model,
		category: Category.model,
		snippet: Snippet.model,
		contactForm: ContactForm.model,
		menuItem: MenuItem.model,
		order: Order.model,
		page: Page.model,
		product: Product.model,
		user: User.model,
		cart: Cart.model,
		translation: Translation.model,
		country: Country.model,
		paymentMethod: PaymentMethod.model,
		shippingMethod: ShippingMethod.model
	};

module.exports = {
	init: function(req, res) {
		const
			pathToDumps = __dirname + '/../../../dump/',
			files = fs.readdirSync(pathToDumps);

		mongoose.connection.db.dropDatabase();

		files.forEach(file => {
			const
				pathToFile = pathToDumps + file,
				fileNameNoExtension = file.replace('.json', '');

			fs.readFile(pathToFile, 'utf8', (err, data) => {
				const
					parsedData = JSON.parse(data).map(record => {
						delete record['_id'];
						return record;
					}),
					model = mapDumpToModel[fileNameNoExtension];

				if (model) {
					model.create(parsedData);
				}
				else {
					console.error(`Model not found for dump ${file}`);
				}
			});
		});

		res.send({result: 'done'});
	}
};
