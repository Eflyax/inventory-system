const
	ContactForm = require('../model/ContactForm.js');

module.exports = {
	getContactForm: function(req, res) {
		const formName = req.params.name;

		if (formName) {
			ContactForm.model.findOne({name: formName})
				.then(result => {
					if (result) {
						res.send({result});
					}
					else {
						res.status(404).send({
							result: 'Not Found'
						});
					}
				});
		}
		else {
			ContactForm.model.find({})
				.then(contactForms => {
					const result = contactForms.map(form => {
						return {
							name: form.name,
							display_name: form.display_name
						};
					});

					res.send({result});
				});
		}
	},
	postContactForm: function(req, res) {
		if (req.body.form_data) {
			res.send({result: true});
		}
		else {
			res.status(422).send({result: 'Contact form data could not be validated'});
		}
	}
};
