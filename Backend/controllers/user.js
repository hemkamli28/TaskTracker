
require('dotenv').config()
const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');


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
    const { username, email, password } = req.body;
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hashedPassword) => {

            const user = new User({ username, email, password: hashedPassword });
            const data = {
                user: {
                    name: user.email,
                }
            }
            try {
                const token = jwt.sign(data, process.env.SECRET, { expiresIn: '5m' })
                const existingUser = await User.find({ email })
                if (existingUser.length > 0) {
                    return res.status(409).json({ success: false, message: "User already exist!" });
                }
                await user.save();
                const verificationLink = `${process.env.CLIENTURL}/user/verify/${token}`
                const emailData = "Please click the following link to verify your email:"
                const emailSubject = "Email Verification"
                sendEmail(user.email, verificationLink, emailData, emailSubject);

                return res.status(200).json({ verificationLink, user, token, success: true, message: "Users Crerated successfully!" });
            }

            catch (err) {
                return res.status(500).json({ error: err, success: false, message: "User Failed to create!" });
            }
        });
    });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ success: false, message: "Please Enter Correct Credentials" });
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(500).json({ success: false, message: "Please Enter Correct Credentials" });
        }
        else {
            const data = {
                user: {
                    name: user.email,
                }
            }
            const token = jwt.sign(data, process.env.SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '15d' })
            if (!user.verified) {
                const verificationLink = `${process.env.CLIENTURL}/user/verify/${token}`
                const emailData = "Please click the following link to verify your email:"
                const emailSubject = "Email Verification"
                // sendEmail(user.email, verificationLink, emailData, emailSubject);
                return res.status(200).json({ success: true, token, refreshToken, verificationLink });
            }
            else {
                return res.status(200).json({ success: true, token, refreshToken });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
}
const newAccessToken = async (req, res) => {
    try {
        const user = req.user
        const data = {
            user: {
                name: user.name,
            }
        }
        const accessToken = jwt.sign(data, process.env.SECRET, { expiresIn: '5m' });
        return res.status(200).json({ accessToken, success: true });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message ,message: "Not generated!" });
    }

}
const verifyUser = async (req, res) => {
    try {
        const token = req.params.token;
        const data = jwt.verify(token, process.env.SECRET);

        const userEmail = await User.findOne({ email: data.user.name });
        if (!userEmail) {
            return res.status(500).json({ success: false, error: error, message: "User not found!" });
        }
        const Id = userEmail._id;
        const updateStatus = await User.findByIdAndUpdate(Id, { $set: { verified: true } }, { new: true });
        if (!updateStatus) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User verified!', updateStatus });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hemk2810@gmail.com', // replace with your Gmail address
        pass: 'ozsd zvfu nvpr brhn'   // replace with your Gmail password
    }
});

const sendEmail = (email, verification, data, subject) => {
    const mailOptions = {
        from: 'hemk2810@gmail.com', // replace with your Gmail address
        to: email,
        subject: `${subject}`,
        html: `<p>${data} ${verification}</p><br/><p>This will be expired in 1m</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const generateOTP = () => {
    return otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
}
const otp = generateOTP();

const sendOtp = (req, res) => {
    const { email } = req.body;
    const emailData = "Here is your one time password(OTP) for reseting your password: ";
    const emailSubject = "OTP for Reset Password ";
    const user = User.findOne({ email });
    if (!user) {
        return res.status(500).json({ success: false, message: 'User Not found!' });
    }
    sendEmail(email, otp, emailData, emailSubject);
    return res.status(200).json({ success: true, message: 'Otp Sent!' });

}

const compareOtp = (req, res) => {
    const { inputOtp } = req.body;
    if (inputOtp !== otp) {
        return res.status(500).json({ success: false, message: 'Incorrect Otp!' });
    }
    return res.status(200).json({ success: true, message: 'Correct Otp!' });

}
const updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(500).json({ success: false, message: 'User not found!' });
        }

        const userId = user._id;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                try {
                    const updatePassword = await User.findByIdAndUpdate(userId, { $set: { password: hashedPassword } }, { new: true });

                    if (!updatePassword) {
                        return res.status(500).json({ success: false, message: 'Failed to update Password!' });
                    }

                    return res.status(200).json({ user, success: true, message: 'Password Updated successfully!' });

                } catch (err) {
                    return res.status(500).json({ error: err.message, success: false, message: "Failed to update password!" });
                }
            });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false, message: "Failed to find user!" });
    }
};


module.exports = { getUsers, addUser, loginUser, verifyUser, sendOtp, compareOtp, updatePassword , newAccessToken};