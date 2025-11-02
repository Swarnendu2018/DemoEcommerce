const express = require('express');

// const Product = require('./../model/product-model');
const Order = require('./../model/order-model');
const Cart = require('./../model/cart-model');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();
// create order from cart
router.post("/checkout",authMiddleware, async(req,res) => {

    try {

        const cart = await Cart.findOne({user:req.user.userId});

        if(!cart || cart.products.length === 0) {
            return res.status(400).json({message:"Cart is empty"});
        }

        const products = cart.products.map((item) => {
            return {product: item.product._id, quantity: item.quantity};
        });

        const totalAmount = cart.totalAmount;

        const order = new Order({
            user:req.user.userId,
            products,
            totalAmount
        });

        await order.save();

        cart.products = [];
        await cart.save();

        res.status(201).json({message:"Order Created Succesfully",order});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

// Get all user orders
router.get('/',authMiddleware,async(req,res)=>{
    try {
        const orders = await Order.findOne({user:req.user.userId});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports=router;