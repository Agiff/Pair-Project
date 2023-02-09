const router = require('express').Router();
const SellerController = require('../controllers/sellerController');
const { isLoggedIn, isSeller } = require('../middlewares');

router.get('/seller/:sellerId', isLoggedIn, isSeller, SellerController.sellerProfile);
router.get('/seller/product/add', isLoggedIn, isSeller, SellerController.sellerShowAddProduct);
router.post('/seller/product/add', isLoggedIn, isSeller, SellerController.sellerCreateProduct);
router.get('/seller/product/:productId/edit', isLoggedIn, isSeller, SellerController.sellerShowEditProduct);
router.post('/seller/product/:productId/edit', isLoggedIn, isSeller, SellerController.sellerUpdateProduct);
router.get('/seller/product/:productId/delete', isLoggedIn, isSeller, SellerController.sellerDeleteProduct);

module.exports = router;