const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    },
    due:{
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000 //24hrs in milliseconds
    },

});

module.exports = mongoose.model('task',TaskSchema);