const express = require("express");
const { authMiddle } = require("../middleware/auth");
const { createTask, getAllTask, updateTask, deleteTask, changeTaskType } = require("../controllers/TaskController");
const router = express.Router();

router.post("/createTask", createTask);
router.get("/getAllTask/:sorted/:token", getAllTask);
router.post("/updateTask", updateTask);
router.post("/changeTaskType", changeTaskType);
router.delete("/deleteTask", deleteTask);

module.exports = router;
