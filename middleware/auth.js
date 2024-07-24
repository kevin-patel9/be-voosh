const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.authMiddle = async (req, res, next) => {
  let token;

  try {
    if (req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
      token = req.cookies.token || req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.KEY);
      req.user = await UserModel.findById(decoded._id);
      next();
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized Token' });
  }
};
