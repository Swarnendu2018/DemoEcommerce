const express = require('express');

const router = express.Router();

const {getAllProducts, createProduct} = require('./../controllers/product-controller');

const upload = require('./../middlewares/multer-config');

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Get all products from the database
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "123345677"
 *                   name:
 *                     type: string
 *                     example: "Peter England Shirt"
 *                   description:
 *                     type: string
 *                     example: "Cotton slim-fit shirt"
 *                   price:
 *                     type: string
 *                     example: "999"
 *                   category:
 *                     type: string
 *                     example: "Apparel"
 *                   imageUrl:
 *                     type: string
 *                     example: "uploads/abc.jpg"
 *                   stock:
 *                     type: string
 *                     example: "5"
 */

router.get('/',getAllProducts);

router.post('/new-product',upload.single('image'),createProduct);


module.exports = router;