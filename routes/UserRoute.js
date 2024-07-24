const express = require("express");
const multer = require("multer");
const { register, login } = require("../controllers/UserController");
const router = express.Router();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
const fileType = file.mimetype.split("/")[0];
if (fileType == "image" || fileType == "string") {
    cb(null, true);
} else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
}
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 150000000 } });

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);


module.exports = router;
