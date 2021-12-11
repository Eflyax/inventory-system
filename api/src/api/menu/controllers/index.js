const
	MenuItem = require('../model/MenuItem.js'),
	Page = require('../../page/model/Page.js'),
	Category = require('../../category/model/Category.js'),
	Product = require('../../product/model/Product.js');

function getSubtree(parentId, children, all) {
	return (children[parentId] || []).map(child => {
		const
			node = Object.assign({
				id: child.id,
				name: child.name,
				url: child.url,
				children: getSubtree(child.id, children, all)
			});

		if (all) {
			node.page_id = child.page_id;
			node.category_id = child.category_id;
			node.product_id = child.product_id;
			node.sequence = child.sequence;
			node.parent_id = child.parent_id;
			node.published = child.published;
		}
		else {
			node.type = child.type;
		}

		return node;
	});
}

function getMenuTree(req, res, all) {
	const
		query = {};

	if (!all) {
		query.published = true;
	}

	return MenuItem.model.find(query)
		.sort('sequence').exec()
		.then(result => {
			if (result && result.length) {
				let
					tree,
					children = {};

				// group by parent_id
				result.forEach(item => {
					let
						key = item.parent_id || 'root';

					if (!(key in children)) {
						children[key] = [];
					}

					children[key].push(item);
				});

				// build tree
				tree = getSubtree('root', children, all);
				res.send({result: tree});
			}
			else {
				res.status(204).send();
			}
		})
		.catch(error => res.status(400).send({error}));
}

module.exports = {
	get: function(req, res) {
		getMenuTree(req, res);
	},
	getAll: function(req, res) {
		getMenuTree(req, res, true);
	},
	post: function(req, res) {
		switch (req.body.type) {
			case 'page':
				req.body.url = Page.model.findOne({id: req.body.page_id});
				break;
			case 'category':
				req.body.url = Category.model.findOne({id: req.body.category_id});
				break;
			case 'product':
				req.body.url = Product.model.findOne({id: req.body.product_id});
				break;
		}

		MenuItem.model.create(req.body)
			.then(() => {
				return getMenuTree(req, res, true);
			});
	},
	patch: async function(req, res) {
		const
			id = req.params.id;

		let
			resource;

		switch (req.body.type) {
			case 'page':
				resource = await Page.model.findOne({id: req.body.page_id});
				break;

			case 'category':
				resource = await Category.model.findOne({id: req.body.category_id});
				break;

			case 'product':
				resource = await Product.model.findOne({id: req.body.product_id});
				break;
		}

		if (resource && resource.slug) {
			req.body.url = resource.slug[0].value;
		}

		MenuItem.model.updateOne({id}, req.body)
			.then(() => {
				return getMenuTree(req, res, true);
			});
	},
	delete: function(req, res) {
		const
			id = req.params.id;

		MenuItem.model.deleteOne({id})
			.then(MenuItem.model.update({parent_id: id}, {
				parent_id: null,
				published: false
			}))
			.then(() => {
				return getMenuTree(req, res, true);
			});
	}
};
