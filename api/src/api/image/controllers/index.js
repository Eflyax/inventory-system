const
	fs = require('fs'),
	rootDirectory = __dirname + '/../../../../';

module.exports = {
	get: function(req, res) {
		const
			pathToFile = 'assets/img/' + req.params.name;

		try {
			if (fs.existsSync(rootDirectory + pathToFile)) {
				res.set({'Content-Type': 'image/png'});
				res.sendFile(pathToFile, {root: rootDirectory});
			}
			else {
				res.status(404).send({error: 'Not found'});
			}
		}
		catch (error) {
			res.status(500).send({error});
		}
	}
};
