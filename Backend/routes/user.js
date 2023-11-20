const express = require("express");
const {getUsers, addUser, loginUser, verifyUser, sendOtp, compareOtp, updatePassword} = require("../controllers/user");
const { authUser } = require("../middleware/authUser");
const router = express.Router();

router.get('/all', authUser ,getUsers);
router.post('/add', addUser);
router.post('/login', loginUser);
router.get('/verify/:token',verifyUser);
router.post('/send-otp',sendOtp);
router.post('/check-otp',compareOtp);
router.put('/reset-password',updatePassword);

module.exports = router;