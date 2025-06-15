const Product = require('./../model/product-model');


exports.getAllProducts = async (req,res) => {
    const product = await Product.find();
    res.json(product);
}

exports.createProduct = async (req,res) => {
    const {name,description,price,category,stock} = req.body;

    const imageUrl = req.file ? req.file.path : '';

    const product = new Product({name,description,price,category,stock,imageUrl});

    await product.save();

    res.status(201).json(product);
}