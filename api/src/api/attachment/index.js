const
	fs = require('fs'),
	rootDirectory = __dirname + '/../../../';

module.exports = {
	upload: function(req, res) {
		res.send({result: null});
	},
	list: function(req, res) {
		const
			files = fs.readdirSync(rootDirectory + 'assets/img/'),
			result = files.map(file => {
				return 'http://' + req.headers.host + '/assets/img/300/300/resize/' + file;
			});

		res.send({result});
	},
	delete: function(req, res) {
		const
			type = req.query.type,
			url = req.query.url,
			urlParts = url.split('/');

		let fileName = null;

		switch (type) {
			case 'image':
				fileName = urlParts[urlParts.length - 1];

				fs.unlink(rootDirectory + 'assets/img/' + fileName, error => {
					if (error) {
						res.status(400).send({error});
					}
					else {
						res.send({result: true});
					}
				});
				break;
			default:
				res.status(400).send({error: 'Unknown type'});
		}
	}
};
