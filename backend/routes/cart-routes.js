const express = require('express');

const authMiddleware = require('../middlewares/auth');

const Cart = require('./../model/cart-model');
const Product = require('./../model/product-model');

const router = express.Router();

// get item in a cart
router.get("/",authMiddleware,async(req,res)=>{
    try {
        let cart = await Cart.findOne({user:req.user.userId});
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

//add item in a Cart
router.post('/add',authMiddleware,async(req,res)=>{

    try {
        const {product,quantity} = req.body;
        const userId = req.user.userId;

        if(userId) {

            let cart = await Cart.findOne({user:userId});

            if(!cart) {
                cart = new Cart({user:userId,products:[]});
            }

            let totalAmount = 0;

            //checking item exist in a cart or not if exist it will give the item index value
            let itemIndex = cart.products.findIndex(p => p.product.toString() === product);

            // check the itemIndex value if it is -1 then that is a new product entering the cart.
            // if existing product I am tring to move it then it will increase the quantity to +1.
            if(itemIndex > -1) {
                //product exists in the cart, update the quantity
                // console.log('....................existing',cart.products[itemIndex].quantity);
                cart.products[itemIndex].quantity += 1;
            } else {
                // product does not exists in cart, add new item
                cart.products.push({product:product,quantity});
            }

            for(let item of cart.products) {
                const product = await Product.findById(item.product);
                if(!product) {
                    res.status(400).json({message:"Product not found"});
                }
                totalAmount += product.price * item.quantity;
            }
            cart.totalAmount = totalAmount;
            // console.log('.................totalAmount:',totalAmount);

            await cart.save();
            res.status(201).json({message:"Product added to a cart",cart});

        } else{
            res.status(400).json({message:"First Logged in then add product in a cart"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports = router;