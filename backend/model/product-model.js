const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    price:{
        type:String,
        required: true
    },
    category:{
        type:String
    },
    imageUrl:{
        type:String,
        required: true
    },
    stock:{
        type:Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Products',productSchema);