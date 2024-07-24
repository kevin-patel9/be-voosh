const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.authMiddle = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token Provided.');

      const decoded = await jwt.verify(token, process.env.KEY);
      req.user = await UserModel.findById(decoded._id);
      next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
