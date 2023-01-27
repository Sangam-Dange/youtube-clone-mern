const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login or signup first",
      });
    }

    const decodedId = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decodedId.id);

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
