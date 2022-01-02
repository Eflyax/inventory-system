const
	router = require('express').Router(),
	authMiddleware = require('./authMiddleware.js'),
	controllerProduct = require('./product/controllers/index.js'),
	controllerStock = require('./stock/controllers/index.js'),
	controllerSystem = require('./system/index.js'),
	controllerUser = require('./user/controllers/index.js');

router.get('/', function(req, res) {
	res.json({status: 'API is online'});
});

router.route('/init/').get(controllerSystem.init);
// Product
router.route('/product/search/').get(controllerProduct.searchProduct);
router.route('/product/:id?').get(controllerProduct.getProduct);
router.route('/product/').post(controllerProduct.addProduct);
router.route('/product/:id?').patch(controllerProduct.updateProduct);
router.route('/product/:id').delete(controllerProduct.deleteProduct);

// Stock
router.route('/stock/:id?').get(controllerStock.getStock);
router.route('/stock/').post(controllerStock.addStock);
router.route('/stock/:id?').patch(controllerStock.updateStock);
router.route('/stock/:id').delete(controllerStock.deleteStock);
router.route('/stock/transaction/').post(controllerStock.postTransaction);

// User
router.route('/user/').get(controllerUser.getUsers);
router.route('/user/:id').patch(controllerUser.patchUser);
// router.route('/user/').get(authMiddleware, controllerUser.getUser);

module.exports = router;
