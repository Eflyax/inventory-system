let
	mongoose = require('mongoose'),
	schema = mongoose.Schema({});

module.exports.model = mongoose.model('newsletter', schema, 'newsletter');
