const
	express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./api/apiRoutes.js'),
	mongoose = require('mongoose'),
	fileUpload = require('express-fileupload');

module.exports = {
	/**
	 * @param {string} host
	 * @param {number} port
	 * @returns {undefined}
	 */
	listen: function(host, port) {
		console.log(`[Server] Starting again on http://${host}:${port}`);

		this._start(host, port);
	},

	/**
	 * @param {string} host
	 * @param {number} port
	 * @returns {undefined}
	 */
	_start: function(host, port) {
		this._initDbConnection();
		this.app = express();
		this.app.listen(port, host);
		this.app.use(express.json());
		this.app.use(cors());

		this.app.use((req, res, next) => {
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', '*');
			res.setHeader('Access-Control-Allow-Headers', '*');

			next();
		});

		this.app.use(bodyParser.json());
		this.app.use(fileUpload({createParentPath: true}));
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use('/', apiRoutes);
		this.app.use('/rest-api/', apiRoutes);
		this.app.use('/rest-api/shop/', apiRoutes);
	},

	/**
	 * @returns {void}
	 */
	_initDbConnection: function() {
		mongoose.connect(
			this._getDbConnectionString(),
			{
				auth: {
					authSource: 'admin'
				},
				user: 'root',
				pass: 'root',
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		);
	},

	/**
	 * @return {string}
	 */
	_getDbConnectionString: function() {
		return `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
	}
};
