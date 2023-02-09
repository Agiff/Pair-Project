const router = require('express').Router();
const customerRoutes = require('./customer');
const sellerRoutes = require('./seller');

router.use(customerRoutes);
router.use(sellerRoutes);

module.exports = router;