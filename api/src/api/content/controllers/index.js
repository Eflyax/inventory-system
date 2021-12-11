const
	Snippet = require('./../model/Snippet.js');

function getSubtree(parentUuid, children) {
	return (children[parentUuid] || []).map(child => {
		return Object.assign({
			uuid: child.uuid,
			content: child.content,
			children: getSubtree(child.uuid, children)
		});
	});
}

function getContent(req, res) {
	let
		query;

	if (req.params.snippet_type) {
		query = {
			snippet_type: req.params.snippet_type,
			res_id: parseInt(req.params.res_id)
		};
	}
	else if (req.params.snippet_key) {
		query = {
			snippet_type: 'common',
			snippet_key: req.params.snippet_key
		};
	}

	return Snippet.model.find(query)
		.sort('sequence').exec()
		.then(result => {
			if (result && result.length) {
				let
					tree,
					children = {};

				// group by parent_uuid
				result.forEach(item => {
					let
						key = item.parent_uuid || 'root';

					if (!(key in children)) {
						children[key] = [];
					}

					children[key].push(item);
				});

				// build tree
				tree = getSubtree('root', children);
				res.send({result: tree[0]});
			}
			else {
				res.status(204).send();
			}
		})
		.catch(error => res.status(400).send({error}));
}

module.exports = {
	get: function(req, res) {
		getContent(req, res);
	},
	patch: function(req, res) {
		Promise.all(req.body.map(item => {
			let
				data,
				query = {
					uuid: item.uuid || null
				};

			if (req.params.snippet_type) {
				query.snippet_type = req.params.snippet_type;
				query.res_id = parseInt(req.params.res_id);
			}
			else if (req.params.snippet_key) {
				query.snippet_type = 'common';
				query.snippet_key = req.params.snippet_key;
			}

			switch (item.action) {
				case 'new':
					data = {
						uuid: item.uuid,
						parent_uuid: item.parent_uuid,
						content: item.content,
						sequence: item.sequence
					};

					if (req.params.snippet_type) {
						data.snippet_type = req.params.snippet_type;
						data.res_id = req.params.res_id;
					}
					else if (req.params.snippet_key) {
						data.snippet_type = 'common';
						data.snippet_key = req.params.snippet_key;
					}

					return Snippet.model.create(data);

				case 'delete':
					return Snippet.model.deleteOne(query);

				case 'update':
					return Snippet.model.updateOne(query, {
						parent_uuid: item.parent_uuid,
						content: item.content,
						sequence: item.sequence
					});
			}
		}))
			.then(() => {
				getContent(req, res);
			});
	}
};
