const express = require("express");
const {addTask, getTasks, deleteTask, updateTask} = require("../controllers/task");
const { authUser } = require("../middleware/authUser");
const router = express.Router();

router.get('/all',authUser , getTasks);
router.post('/add',authUser , addTask);
router.delete('/:taskId',authUser , deleteTask);
router.put('/:taskId',authUser , updateTask);

module.exports = router;