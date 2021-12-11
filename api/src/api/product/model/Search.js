module.exports = {
	searchByQuery(req, model, callback) {
		if (req.query.m) { // Manufacturer
			model
				.where('manufacturer.id')
				.in(req.query.m.split(',').map(Number));
		}

		if (req.query.q) { // Attributes / Features
			// TODO
		}

		if (req.query.o) {
			const
				parts = req.query.o.split(' '),
				orderDirection = parts[1] === 'asc' ? '-' : '';

			switch (parts[0]) {
				case 'price':
					model.sort(orderDirection + 'variants.price.price');
					break;
				default:
					console.log(`Sorting by field "${parts[0]}" is not implemented`);
			}
		}

		if (req.query.p) { // Price range
			const range = req.query.p.split('-');

			if (range.length === 1) {
				model
					.where('variants.price.price')
					.gte(parseInt(range[0]));
			}
			else {
				model
					.where('variants.price.price')
					.gte(parseInt(range[0]))
					.lte(parseInt(range[1]));
			}
		}

		if (req.query.limit) { // Limit
			model.limit(parseInt(req.query.limit));
		}

		if (req.query.offset) { // Offset
			model.skip(parseInt(req.query.offset));
		}

		if (req.query.b) { // Badge
			model
				.where('badges.name')
				.in(req.query.b.split(','));
		}

		if (req.query.st) { // Stock availability
			const
				parts = req.query.st.split(':'),
				availability = parseInt(parts[0]),
				stocks = parts[1] ? parts[1].split(',').map(Number) : null;

			if (stocks) {
				model
					.where('variants.stock.locations.id')
					.in(stocks);
			}
			else {
				model
					.where('variants.stock.in_stock')
					.equals(availability === 1);
			}
		}

		if (req.query.s) { // Search by fulltext
			model.where('name', new RegExp(req.query.s, 'i'));
		}

		callback(model);
	}
};
