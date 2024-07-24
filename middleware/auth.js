const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.authMiddle = async (req, res, next) => {
  try {
    let token;

    if (
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
    ) {
      token = req.cookies.token || req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.KEY);
      req.user = await UserModel.findById(decoded._id);
      next();
    } else {
      return res.status(401).send({
        message: "please login",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
