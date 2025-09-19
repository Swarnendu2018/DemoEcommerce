const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
    street:String,
    city:String,
    state:String,
    postalCode:String,
    country:String,
    isDefault:{ type: Boolean, default:false }
});


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    address: [addressSchema],
    createdAt:{
        type:Date,
        default:Date.now
    }
});


UserSchema.pre('save',async function(next) {
    try {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hashSync(this.password,salt);
        next();  
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('User',UserSchema);