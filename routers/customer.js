const router = require('express').Router();
const CustomerController = require('../controllers/customerController');
const { isLoggedIn, isCustomer } = require('../middlewares');

router.get('/product/:productId', CustomerController.productDetail);
router.get('/customer/:customerId', isLoggedIn, isCustomer, CustomerController.customerProfile);
router.get('/customer/:customerId/transaction', CustomerController.getTransaction)
router.get('/product/:productId/addToCart', CustomerController.addToCart)
router.get('/customer/:customerId/cart', CustomerController.getCart)
router.get('/customer/:customerId/cart/:cartId/pay', CustomerController.getPayCart)

module.exports = router;