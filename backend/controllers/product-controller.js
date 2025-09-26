const Product = require('./../model/product-model');

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const product = await Product.find();
            res.json(product);
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"});
        }
    },
    getSingleProductById: async (req,res) => {
        try {
            const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(404).json({message:"Product not found"});
            }

            res.json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal Server Error"});
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, description, price, category, stock } = req.body;

            // console.log(req.file);
            const imageUrl = req.file ? req.file.path : '';

            const product = new Product(
                { 
                    name, 
                    description, 
                    price, 
                    category, 
                    stock, 
                    imageUrl, 
                    createdBy: req.user.userId
                }
            );

            await product.save();

            res.status(201).json({message:"Product Created Succesfully",product});  
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal Server Error"});
        }
    },
    updateProduct: async (req,res) => {
        try {
            const updateData = {...req.body};

            if(req.file) {
                updateData.imageUrl = req.file.path;
            }
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,updateData,{new: true});

            if(!updatedProduct) {
                return res.status(404).json({message:"Product not found"});
            }

            res.json({message:"Product updated succesfully",updatedProduct});
            
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"});
        }
    },
    deleteProduct: async (req,res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);

            if(!deletedProduct) {
                return res.status(404).json({message:"Product not found"});
            }

            res.json({message:"Product Deleted succesfullly"});
            
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"});
        }
    }
};

