const express = require("express");
const {addTask, getTasks, deleteTask, updateTask, getTodayTasks, getTasksWithStatus} = require("../controllers/task");
const { authUser } = require("../middleware/authUser");
const router = express.Router();

router.get('/all',authUser , getTasks);
router.post('/add',authUser , addTask);
router.delete('/:taskId',authUser , deleteTask);
router.put('/status/:taskId',authUser , updateTask);
router.get('/today',authUser , getTodayTasks);
router.get('/tasks',authUser , getTasksWithStatus);
module.exports = router;