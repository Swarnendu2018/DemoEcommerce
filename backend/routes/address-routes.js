const express = require("express");
const User = require('../model/user-model');
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//Add new address

router.post("/add", authMiddleware , async (req,res)=>{
    try {
        const {street,city,state,postalCode,country,isDefault} = req.body;

        const user = await User.findById(req.user.userId);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(isDefault){
            user.address.forEach(addr=>(addr.isDefault=false));
        }

        user.address.push({street,city,state,postalCode,country,isDefault});

        await user.save();

        res.json({message:"Address added successfully",address:user.address})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})


module.exports = router;