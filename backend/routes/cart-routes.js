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
                const productPrice = product.price * item.quantity;
                item.productPrice = product.price;
                item.productImage = product.imageUrl;
                item.itemSubTotal = productPrice;
                totalAmount += productPrice;
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
});

// increase quantity in a cart
router.patch('/increase/:productId', authMiddleware, async(req,res)=>{
    try {
        const userId = req.user.userId;

        const productId = req.params.productId;

        let cart = await Cart.findOne({user:userId});

        if(!cart) return res.status(400).json({message:'Cart not found'});

        const cartItemToIncrease = cart.products.findIndex(item=>item.product.toString() === productId);

        if (cartItemToIncrease === -1) {
            return res.status(404).json({ message: 'Product not found in a cart' });
        }

        const maxItemIntoCart = 5;

        const item = cart.products[cartItemToIncrease];
        
        
        if(item.quantity >= maxItemIntoCart) {
            return res.status(400).json({ message: 'Already you reached a maximum quantity.' });
        }
        
        item.quantity += 1;
        cart.products[cartItemToIncrease].itemSubTotal += cart.products[cartItemToIncrease].productPrice;

        cart.totalAmount += cart.products[cartItemToIncrease].productPrice;

        await cart.save();

        res.status(201).json({message:"Product Quantity Increased",cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

// Decrease Quantity in a Cart
router.patch('/decrease/:productId',authMiddleware, async(req,res)=>{
    try {
        const userId = req.user.userId;

        const productId = req.params.productId;

        let cart = await Cart.findOne({user:userId});

        if(!cart) return res.status(400).json({message:'Cart not found'});

        const cartItemToDecrease = cart.products.findIndex(item=>item.product.toString() === productId);

        if (cartItemToDecrease === -1) {
            return res.status(404).json({ message: 'Product not found in a cart' });
        }

        const item = cart.products[cartItemToDecrease];

        // if(item.quantity === 1){
        //     cart.totalAmount = cart.totalAmount - cart.products[cartItemToDecrease].itemSubTotal;
        //     cart.products.splice(cartItemToDecrease, 1);
        //     res.status(201).json({message:"Product removed from the cart",cart});
        // }

        item.quantity -= 1;

        item.itemSubTotal -= item.productPrice;

        cart.totalAmount -= item.productPrice;

        if(item.itemSubTotal === 0) {
            cart.products.splice(cartItemToDecrease, 1);
        }

        await cart.save();

        res.status(201).json({message:"Product Quantity decreased",cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

// delete item from cart
router.delete('/:productId', authMiddleware, async(req,res)=>{
    try {
        const userId = req.user.userId;

        const productId = req.params.productId;

        let cart = await Cart.findOne({user:userId});

        if(!cart) return res.status(400).json({message:'Cart not found'});

        const cartItemToRemoveIndex = cart.products.findIndex(item=>item.product.toString() === productId);

        if (cartItemToRemoveIndex === -1) {
            return res.status(404).json({ message: 'Product not found in a cart' });
        }
        // console.log(cart.products[cartItemToRemoveIndex].itemSubTotal);

        cart.totalAmount = cart.totalAmount - cart.products[cartItemToRemoveIndex].itemSubTotal;

        // console.log(updatedTotalAmount);
        cart.products.splice(cartItemToRemoveIndex, 1);
        await cart.save();

        res.status(201).json({message:"Product deleted to a cart",cart});
        // console.log(cartItemToRemove);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports = router;