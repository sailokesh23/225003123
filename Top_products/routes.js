const express = require('express');
const { getTopProducts, getProductDetails } = require('./controllers');

const router = express.Router();

router.get('/:categoryname/products', getTopProducts);
router.get('/:categoryname/products/:productid', getProductDetails);

module.exports = router;