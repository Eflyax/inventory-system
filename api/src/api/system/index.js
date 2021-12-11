const
	mongoose = require('mongoose'),
	fs = require('fs'),
	Product = require('./../product/model/Product.js'),
	Stock = require('./../stock/model/Stock.js'),
	User = require('./../user/model/User.js'),
	mapDumpToModel = {
		product: Product.model,
		stock: Stock.model,
		user: User.model
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
