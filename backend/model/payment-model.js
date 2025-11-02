const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required: true
    },
    provider:{
        type:String,
        enum: ["razorpay","stripe"],
        default: "razorpay"
    },
    providerOrderId:{
        type: String,
        required: true
    },
    providerPaymentId:{ 
        type: String
    },
    providerSignature:{
        type: String
    },
    status:{
        type: String,
        enum: ["pending","paid","failed"],
        default: "pending"
    },
    amount:{
        type: Number,
        required:true
    },
    currency:{
        type: String,
        default: "INR"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment',PaymentSchema);