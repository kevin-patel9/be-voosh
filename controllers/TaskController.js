const Task = require("../models/TaskModels");

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        const newTask = {
            userId: req.user.userId,
            title,
            description
        };

        await Task.create(newTask);

        return res.status(200).send({
            message: "New task created"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.getAllTask = async (req, res) => {
    try {
        const { sorted } = req.params;

        const allTask = await Task.find({ userId: req.user.userId });

        const taskTypes = {
            toComplete: [],
            inProcess: [],
            done: []
        };
        
        allTask.forEach(item => {
            switch (item.taskType) {
                case "toComplete":
                    taskTypes.toComplete.push(item);
                    break;
                case "inProcess":
                    taskTypes.inProcess.push(item);
                    break;
                case "done":
                    taskTypes.done.push(item);
                    break;
                default:
                    break;
            }
        });
        
        const { toComplete, inProcess, done } = taskTypes;
        
        // reverse data for sorting
        const tasks = {
            toComplete: sorted !== "true" ? toComplete.reverse() : toComplete,
            inProcess: sorted !== "true" ? inProcess.reverse() : inProcess,
            done: sorted !== "true" ? done.reverse() : done
        };        

        return res.status(200).send({
            tasks
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId, title = "", description = "" } = req.body;

        const task = await Task.findById(taskId);

        if (!task)
            return res.status(404).send({
                message: "Task with given ID does not exist"
            });

        if (title.length > 0) task.title = title;

        if (description.length > 0) task.description = description;

        await task.save();

        return res.status(200).send({
            message: "Task data updated successfully"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.changeTaskType = async (req, res) => {
    try {
        const { taskId, taskType } = req.body;

        const task = await Task.findById(taskId);

        if (!task)
            return res.status(404).send({
                message: "Task with given ID does not exist"
            });

        task.taskType = taskType;

        await task.save();

        return res.status(200).send({
            message: "Task data updated successfully"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const taskExist = await Task.findById(taskId);

        if (!taskExist)
            return res.status(404).send({
                message: "Task with given ID does not exist"
            });

        await Task.findByIdAndDelete(taskId);

        return res.status(200).send({
            message: "Task deleted successfully"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
