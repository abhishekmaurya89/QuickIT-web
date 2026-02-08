const jwt = require("jsonwebtoken");
const User = require("../models/auth-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleware:", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({password:0});
    req.user=userData;
    req.token=token;
    req.userID=userData._id;
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userData; 
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
