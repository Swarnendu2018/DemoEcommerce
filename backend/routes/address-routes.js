const express = require("express");
const User = require('../model/user-model');
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

//Add new address

router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { street, city, state, postalCode, country, isDefault } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (isDefault) {
            user.address.forEach(addr => (addr.isDefault = false));
        }

        user.address.push({ street, city, state, postalCode, country, isDefault });

        await user.save();

        res.json({ message: "Address added successfully", address: user.address })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
});

// Get All Address

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.address);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// update an address using patch

router.patch("/:addressId", authMiddleware, async (req, res) => {
    try {
        const { addressId } = req.params;
        const updateFields = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addressToUpdate = user.address.id(addressId);
        if (!addressToUpdate) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Handle default flag
        if (updateFields.isDefault) {
            user.address.forEach(addr => (addr.isDefault = false));
        }

        // Apply only provided fields
        Object.keys(updateFields).forEach(field => {
            addressToUpdate[field] = updateFields[field];
        });

        await user.save();

        res.json({ message: "Address Updated Successfully", address: user.address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// update an address

router.put("/:addressId", authMiddleware, async (req, res) => {
    try {
        const { addressId } = req.params;

        const { street, city, state, postalCode, country, isDefault } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addressToUpdate = user.address.id(addressId);
        if (!addressToUpdate) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (isDefault) {
            user.address.forEach(addr => (addr.isDefault = false));
        }

        addressToUpdate.set({ street, city, state, postalCode, country, isDefault });

        await user.save();

        res.json({ message: "Address Updated Successfully", address: user.address })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//delete address

router.delete("/:addressId", authMiddleware, async (req, res) => {
    try {

        const { addressId } = req.params;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addressToRemove = user.address.id(addressId);
        if (!addressToRemove) {
            return res.status(404).json({ message: "Address not found" });
        }

        // console.log(addressToRemove);

        addressToRemove.deleteOne();

        await user.save();

        res.json({ message: "Address deleted successfully", address: user.address })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;