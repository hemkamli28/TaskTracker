const express = require("express");
const Task = require("../models/task");

const getTasks = async (req, res) => {
    try {
        console.log(req.user.name);
        const tasks = await Task.find({user: req.user.name});
        
        res.status(200).json({ tasks , success: true, message: 'Task'});
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Users not Found!" });

    }
}
const addTask = async( req, res) =>{
    try {
        console.log('User Name:', req.user.name);
        const { title, description, status, due} = req.body;
        const user = req.user.name;
        const task = new Task({title, description, status, due, user});
        await task.save();
        res.status(200).json({ task,  success: true, message: "Task Crerated successfully!" });
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!", error: error.message});
    }
}

const deleteTask = async( req, res) =>{
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if(task.user !== req.user.name){
            return res.status(404).json({ success: false, message: 'Permission Denied!' });
        }
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully', deletedTask });
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!", error: error.message});
    }
}

const updateTask = async( req, res) =>{
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if(task.user !== req.user.name){
            return res.status(404).json({ success: false, message: 'Permission Denied!' });
        }
        const updateStatus = await Task.findByIdAndUpdate(taskId, { $set: { status: true } }, { new: true });
        if (!updateStatus) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task updated successfully', updateStatus });
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!", error: error.message});
    }
}

module.exports = {addTask, getTasks, deleteTask, updateTask};