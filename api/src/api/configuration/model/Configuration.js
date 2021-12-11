let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({
		public_runtime_config: Object,
		private_runtime_config: Object
	});

module.exports.model = mongoose.model('configuration', schema, 'configuration');
