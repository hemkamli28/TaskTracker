const express = require("express");
const {getUsers, addUser, loginUser} = require("../controllers/user");
const { authUser } = require("../middleware/authUser");
const router = express.Router();

router.get('/all', authUser ,getUsers);
router.post('/add', addUser);
router.post('/login', loginUser);
// router.route("/").get(getData);

module.exports = router;