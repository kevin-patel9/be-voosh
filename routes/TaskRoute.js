const express = require("express");
const { authMiddle } = require("../middleware/auth");
const { createTask, getAllTask, updateTask, deleteTask, changeTaskType } = require("../controllers/TaskController");
const router = express.Router();

router.post("/createTask", authMiddle, createTask);
router.get("/getAllTask/:sorted", authMiddle, getAllTask);
router.post("/updateTask", authMiddle, updateTask);
router.post("/changeTaskType", authMiddle, changeTaskType);
router.delete("/deleteTask", authMiddle, deleteTask);

module.exports = router;
