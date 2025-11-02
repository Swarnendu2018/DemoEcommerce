const express = require('express');
const Razorpay =  require('razorpay');
const crypto = require('crypto');
const Payment = require('./../model/payment-model');
const Order = require('./../model/order-model');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// create a razorpay instance using key_id and key_secrets. This two we will get after register the razorpay account
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secrets: process.env.RAZORPAY_KEY_SECRETS
});

// create Razorpay Order
router.post("/create",authMiddleware, async (req,res) => {
    try {
        const {orderId} = req.body;

        const order = await Order.findById(orderId);

        if(!order) {
            res.status(404).json({message:"Order not found"});
        }

        const option = {
            amount: order.totalAmount * 100, // order amount should calculate in paisa
            currency: "INR",
            receipt:`order_rcptid_${orderId}`
        };

        const razorOrder = await razorpay.orders.create(option);

        const payment = new Payment({
            user:req.user.userId,
            order: order._id,
            provider: "razorpay",
            providerOrderId: razorOrder.id,
            amount: order.totalAmount,
            currency: "INR",
            status: "pending" 
        });

        await payment.save();

        await Order.findByIdAndUpdate(order.id,{payment: payment._id});

        res.status(201).json({message:"Order Created Succesfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

// verify payment status
router.post("verify",authMiddleware,async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRETS).update(body.toString()).digest("hex");

        if(expectedSignature === razorpay_signature) {
            const payment = await Payment.findOneAndUpdate({providerOrderId:razorpay_order_id},{
                status: "paid",
                providerPaymentId: razorpay_payment_id,
                providerSignature: razorpay_signature
            },{new:true});

            res.json({message:"Payment Verified successfully", payment});
        } else {
            res.status(400).json({message:"Invalid Signature"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports = router;