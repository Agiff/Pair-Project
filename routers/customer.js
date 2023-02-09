const router = require('express').Router();
const CustomerController = require('../controllers/customerController');
const { isLoggedIn, isCustomer } = require('../middlewares');
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.post('/email', CustomerController.sentMail)
router.get('/product/:productId', CustomerController.productDetail);
router.get('/customer/:customerId', isLoggedIn, isCustomer, CustomerController.customerProfile);
router.get('/customer/:customerId/transaction', CustomerController.getTransaction)
router.get('/customer/:customerId/topup', CustomerController.showUserTopUp)
router.post('/customer/:customerId/topup', CustomerController.userTopUp)
router.get('/product/:productId/addToCart', CustomerController.addToCart)
router.get('/customer/:customerId/cart', CustomerController.getCart)
router.get('/customer/:customerId/cart/:cartId/pay', CustomerController.getPayCart)

module.exports = router;