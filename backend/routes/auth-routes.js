const express = require('express');
const User = require('../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// router.get('/users',(req,res) => {

// })

router.post('/register',async (req,res) => {

    const {name,email,password} = req.body;

    try {
        const ExistingUser = await User.findOne({email});

        if(ExistingUser){
            return res.status(400).json({message:'User Already Exist'});
        }

        const newUser = new User({name,email,password});

        await newUser.save();

        return res.status(201).json({message:'User Saved Succesfully'});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }

});


router.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password);


        if(!isMatch){
            return res.status(400).json({message:"Invalid Password Credentials"});
        }

        const payload = {userId:user.id,name:user.name};

        const token = jwt.sign(payload,process.env.JWT_Secret,{expiresIn:'1h'});

        res.json({message:token});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.post('/logout',async (req,res)=>{
    res.json({message:"Logout Succesfull.. Please login again"});
})

module.exports = router;