const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required: true
            },
            quantity: {
                type:Number,
                required: true,
                default: 1
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["pending","paid","failed"],
        default:"pending"
    },
    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },
    orderStatus:{
        type:String,
        enum:["processing","shipped","delivered","Cancelled"],
        default:"processing"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('Orders',orderSchema);