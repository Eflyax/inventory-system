module.exports = {
	zip: function(req, res) {
		const
			valid = parseInt(req.body.zip) > 20000;

		res.send({
			result: {
				valid: valid,
				errorMessage: valid ? null : `Invalid ZIP for country "${req.body.country_code}"`
			}
		});
	}
};
