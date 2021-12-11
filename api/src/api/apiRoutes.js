const
	router = require('express').Router(),
	authMiddleware = require('./authMiddleware.js'),
	controllerAddress = require('./address/controllers/index.js'),
	controllerAttachment = require('./attachment/index.js'),
	controllerAttribute = require('./attribute/controllers/index.js'),
	controllerCart = require('./cart/controllers/index.js'),
	controllerCategory = require('./category/controllers/index.js'),
	controllerConfiguration = require('./configuration/controllers/index.js'),
	controllerContent = require('./content/controllers/index.js'),
	controllerImage = require('./image/controllers/index.js'),
	controllerContactForm = require('./contactForm/controllers/index.js'),
	controllerMenu = require('./menu/controllers/index.js'),
	controllerNewsletter = require('./newsletter/controllers/index.js'),
	controllerOrder = require('./order/controllers/index.js'),
	controllerPage = require('./page/controllers/index.js'),
	controllerProduct = require('./product/controllers/index.js'),
	controllerReview = require('./review/controllers/index.js'),
	controllerSearch = require('./search/controllers/index.js'),
	controllerSystem = require('./system/index.js'),
	controllerTranslation = require('./translation/controllers/index.js'),
	controllerUser = require('./user/controllers/index.js'),
	controllerValidation = require('./validation/controllers/index.js'),
	controllerVoucher = require('./voucher/controllers/index.js'),
	sessionMiddleware = require('./sessionMiddleware.js');

router.get('/', function(req, res) {
	res.json({status: 'API is online'});
});

router.route('/init/').get(controllerSystem.init);
router.route('/user/').get(authMiddleware, controllerUser.getUser);
router.route('/user/').post(controllerUser.postUser);
router.route('/user/').patch(authMiddleware, controllerUser.patchUser);
router.route('/user/change-password/').post(authMiddleware, controllerUser.postChangePassword),
router.route('/user/register/').post(controllerUser.postUserRegister);
router.route('/user/reset-password/').post(controllerUser.postResetPassword);
router.route('/user/reset-password/reset/').post(controllerUser.postResetPasswordReset);
router.route('/user/login/').post(controllerUser.postUserLogin);
router.route('/user/login/anonymous').post(controllerUser.postUserLoginAnonymous);
router.route('/user/logout/').post(authMiddleware, controllerUser.postUserLogout);
router.route('/user/order-history/:id?').get(controllerUser.getUserOrderHistory);
// Menu
router.route('/menu').get(controllerMenu.get);
router.route('/menu/all/').get(authMiddleware, controllerMenu.getAll);
router.route('/menu/all/').post(authMiddleware, controllerMenu.post);
router.route('/menu/all/:id').patch(authMiddleware, controllerMenu.patch);
router.route('/menu/all/:id').delete(authMiddleware, controllerMenu.delete);
// Page
router.route('/page/homepage/').get(controllerPage.getHomepage);
router.route('/page/homepage/').post(authMiddleware, controllerPage.postHomepage);
router.route('/page/all/').get(authMiddleware, controllerPage.get);
router.route('/page/all/').post(authMiddleware, controllerPage.post);
router.route('/page/all/:id').patch(authMiddleware, controllerPage.patch);
router.route('/page/all/:id').delete(authMiddleware, controllerPage.delete);
router.route('/page/:id([0-9]+)').get(controllerPage.getRecord);
router.route('/page/:slug([a-z0-9-]+)').get(controllerPage.getRecord);
// Address
router.route('/address/:id').get(authMiddleware, controllerAddress.getAddress);
router.route('/address/').get(authMiddleware, controllerAddress.getAddresses);
router.route('/address/').post(authMiddleware, controllerAddress.postAddress);
router.route('/address/:id').patch(authMiddleware, controllerAddress.patchAddress);
router.route('/address/:id').delete(authMiddleware, controllerAddress.deleteAddress);
// Address/primary
router.route('/address/:id/primary/').post(authMiddleware, controllerAddress.postPrimaryAddress);
// Attribute
router.route('/attribute/').get(controllerAttribute.get);
// Order
router.route('/order/:hash').get(controllerOrder.getOrderConfirmed);
// Product
router.route('/product/').get(controllerProduct.getProduct);
router.route('/product/:id').get(controllerProduct.getProductDetail);
// Category
router.route('/category/').get(controllerCategory.get);
router.route('/category/:id').get(controllerCategory.getRecord);
// Review
router.route('/review/:identifier').get(controllerReview.get);
// Content
router.route('/content/common/:snippet_key').get(controllerContent.get);
router.route('/content/:snippet_type/:res_id').get(controllerContent.get);
router.route('/content/common/:snippet_key').patch(authMiddleware, controllerContent.patch);
router.route('/content/:snippet_type/:res_id').patch(authMiddleware, controllerContent.patch);
// Image (static content)
router.route('/assets/img/:width/:height/resize/:name').get(controllerImage.get);
// Attachments
router.route('/attachment/list/').post(controllerAttachment.list);
router.route('/attachment/upload').post(controllerAttachment.upload);
router.route('/attachment/').delete(controllerAttachment.delete);
// Newsletter
router.route('/newsletter/subscribe/').get(controllerNewsletter.get);
// Cart
router.route('/cart/').get(sessionMiddleware, controllerCart.getCart);
router.route('/cart/line/').post(sessionMiddleware, controllerCart.postCartLine);
router.route('/cart/line/:id/').patch(sessionMiddleware, controllerCart.patchCartLine);
router.route('/cart/line/:id/').delete(sessionMiddleware, controllerCart.deleteCartLine);
router.route('/cart/addresses/').get(sessionMiddleware, controllerCart.getCartAddresses);
router.route('/cart/addresses/countries/').get(sessionMiddleware, controllerCart.getCartAddressesCountries);
router.route('/cart/address/invoice/').post(sessionMiddleware, controllerCart.postCartAddressInvoice);
router.route('/cart/address/delivery/').post(sessionMiddleware, controllerCart.postCartAddressDelivery);
router.route('/cart/shipping/published/').get(sessionMiddleware, controllerCart.getCartShippingMethods);
router.route('/cart/shipping/').post(sessionMiddleware, controllerCart.postCartShipping);
router.route('/cart/payment/published/').get(sessionMiddleware, controllerCart.getCartPaymentMethods);
router.route('/cart/payment/').post(sessionMiddleware, controllerCart.postCartPayment);
router.route('/cart/confirm/').post(sessionMiddleware, controllerCart.postCartConfirm);
// Configuration
router.route('/configuration/').get(controllerConfiguration.getConfiguration);
// Validation
router.route('/validation/zip').post(controllerValidation.zip);
// Contact form
router.route('/contact-form/:name?').get(controllerContactForm.getContactForm);
router.route('/contact-form/:name').post(controllerContactForm.postContactForm);
// Translation
router.route('/translation/:locale').get(controllerTranslation.get);
// Search
router.route('/search').get(controllerSearch.search);
// Voucher
router.route('/voucher/check').post(controllerVoucher.check);
//
module.exports = router;
