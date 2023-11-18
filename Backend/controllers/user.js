
const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users, success: true, message: "Users found successfully!" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Users not Found!" });

    }
}

const addUser = async (req, res) => {
    const { username, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hashedPassword) => {
            const user = new User({ username, password: hashedPassword });
            const data = {
                user: {
                    name: user.username,
                }
            }

            try {
                const token = jwt.sign(data, process.env.SECRET, { expiresIn: '2m' })
                await user.save();


                res.status(200).json({ user, token, success: true, message: "Users Crerated successfully!" });
            }

            catch (err) {
                res.status(500).json({ error: err.message, success: false, message: "User Failed to create!" });
            }
        });
    });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username })
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!user || !comparePassword) {
            return res.status(500).json({ success: false, message: "Please Enter Correct Credentials" });
        }
        const data = {
            
            user: {
                name: user.username,
            }
        }
        const token = jwt.sign(data, process.env.SECRET);
        res.status(200).json({ success: true, token });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });

    }

}




module.exports = { getUsers, addUser, loginUser };