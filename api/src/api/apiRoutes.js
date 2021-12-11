const
	router = require('express').Router(),
	authMiddleware = require('./authMiddleware.js'),
	controllerProduct = require('./product/controllers/index.js'),
	controllerSystem = require('./system/index.js'),
	controllerUser = require('./user/controllers/index.js');

router.get('/', function(req, res) {
	res.json({status: 'API is online'});
});

router.route('/init/').get(controllerSystem.init);
router.route('/product/:id').get(controllerProduct.getProductDetail);
router.route('/product/').get(controllerProduct.getProduct);
router.route('/user/').get(controllerUser.getUsers);

// router.route('/user/').get(authMiddleware, controllerUser.getUser);

module.exports = router;
