const express = require('express');

const router = express.Router();

const {getAllProducts, getSingleProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/product-controller');

const upload = require('../middlewares/multer-config');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/role');

router.get('/',authMiddleware,getAllProducts);

router.get('/:id',authMiddleware,getSingleProductById);

router.post('/',authMiddleware,checkRole("vendor","admin"),upload.single('image'),createProduct);

router.patch("/:id",authMiddleware,checkRole("vendor"),updateProduct);

router.delete("/:id",authMiddleware,checkRole("vendor"),deleteProduct);


module.exports = router;