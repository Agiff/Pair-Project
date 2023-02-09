const router = require('express').Router();
const SellerController = require('../controllers/sellerController');
const { isLoggedIn, isSeller } = require('../middlewares');

router.get('/seller/:sellerId', isLoggedIn, isSeller, SellerController.sellerProfile);
router.get('/seller/product/:productId/edit', isLoggedIn, isSeller, SellerController.sellerShowEditProduct);
router.post('/seller/product/:productId/edit', isLoggedIn, isSeller, SellerController.sellerEditProduct);
router.get('/seller/product/:productId/delete', isLoggedIn, isSeller, SellerController.sellerDeleteProduct);

// get  /product/:productId/delete
// get  /product/:productId/edit
// post /product/:productId/edit

module.exports = router;