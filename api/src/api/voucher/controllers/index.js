module.exports = {
	check: (req, res) => {
		res.send({
			result: {
				valid: true,
				description: '10% sale'
			}
		});
	}
};
