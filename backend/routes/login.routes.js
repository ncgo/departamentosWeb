const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");


router.post("/", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            ok: false,
            message: "User not found",
        });
    }else{
        if (await user.validatePassword(password)) {
            const token = jwt.sign({user}, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24
            });
            const usr = {
                id: user._id,
                name: user.firstName,
                lastName: user.lastName
            }
            res.status(200).json({
                ok: true,
                user: usr,
                token: token
            });
        }else{
            res.status(400).json({
                ok: false,
                message: "Invalid password"
            });
        }
    }
});

module.exports = router;