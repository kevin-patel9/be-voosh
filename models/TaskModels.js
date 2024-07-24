const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: {
        type: String,
        index: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskType: {
        type: String,
        default: "toComplete"
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
