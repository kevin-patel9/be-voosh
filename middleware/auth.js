const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.authMiddle = async (token) => {
  try {
      const decoded = jwt.verify(token, process.env.KEY);
      return decoded._id;
  } catch (error) {
    console.log("Error");
  }
};
