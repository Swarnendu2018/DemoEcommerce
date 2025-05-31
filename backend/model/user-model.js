const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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