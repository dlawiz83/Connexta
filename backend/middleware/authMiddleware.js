const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user and attach
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
});

module.exports = { protect };
