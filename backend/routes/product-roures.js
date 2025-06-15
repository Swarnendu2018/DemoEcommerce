const express = require('express');

const router = express.Router();

const {getAllProducts, createProduct} = require('./../controllers/product-controller');

const upload = require('./../middlewares/multer-config');

router.get('/',getAllProducts);

router.post('/new-product',upload.single('image'),createProduct);


module.exports = router;