const express = require("express");
const Task = require("../models/task");
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.name });

        res.status(200).json({ tasks, success: true, message: 'Task' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Users not Found!" });

    }
}

const getTodayTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.name });
        const filteredTasks = [];

        const today = new Date();
        for (const task of tasks) {
            const timeDiff = task.due.getTime() - today.getTime();
            const isDueIn24Hrs = timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 0;

            if (isDueIn24Hrs && task.status === false) {
                filteredTasks.push(task);
            }
        }

        res.status(200).json({ tasks: filteredTasks });
    } catch (error) {
        console.error('Error fetching tasks due in 24 hours:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getTasksWithStatus = async (req, res) => {
    try {
        const completedTasks = await Task.find({ user: req.user.name, status: true })
        const incompleteTasks = await Task.find({ user: req.user.name, status: false })
        const filteredIncompleted = [];
        const missedTasks = [];

        const today = new Date();
        for (const task of incompleteTasks) {
            const timeDiff = task.due.getTime() - today.getTime();
            const moreThen24Hrs = timeDiff >= 24 * 60 * 60 * 1000;

            if (moreThen24Hrs) {
                filteredIncompleted.push(task);
            }
        }
        for (const task of incompleteTasks) {
            const timeDiff = task.due.getTime() - today.getTime();
            const missedTime = timeDiff < 0;
            if (missedTime) {
                missedTasks.push(task);
            }
        }
        res.status(200).json({ completedTasks, filteredIncompleted,missedTasks, success: true, message: 'Task' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
}

// const addTask = async( req, res) =>{
//     try {
//         const { title, description, status, due} = req.body;
//         const user = req.user.name;
//         const task = new Task({title, description, status, due, user});
//         await task.save();
//         res.status(200).json({ task,  success: true, message: "Task Crerated successfully!" });

//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error!", error: error.message});
//     }
// }

const addTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body; // Extract dueDate from request body
        const user = req.user.name;

        // Parse dueDate string to Date object
        // const parsedDueDate = new Date(dueDate.split('/')[2], parseInt(dueDate.split('/')[1]) - 1, parseInt(dueDate.split('/')[0]));
        const parsedDueDate = new Date(dueDate);
        const task = new Task({ title, description, status, due: parsedDueDate, user });
        await task.save();
        res.status(200).json({ task, success: true, message: 'Task Created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (task.user !== req.user.name) {
            return res.status(404).json({ success: false, message: 'Permission Denied!' });
        }
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully', deletedTask });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (task.user !== req.user.name) {
            return res.status(404).json({ success: false, message: 'Permission Denied!' });
        }
        const updateStatus = await Task.findByIdAndUpdate(taskId, { $set: { status: true } }, { new: true });
        if (!updateStatus) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task updated successfully', updateStatus });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
}

module.exports = { addTask, getTasks, deleteTask, updateTask, getTodayTasks, getTasksWithStatus };