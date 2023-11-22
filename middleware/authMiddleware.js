const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.verifyToken = (req, res, next) => {
  // Get the token from the request header or query string
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.query.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    req.user = decoded.userId; // Store decoded user information in the request object
    next(); // Pass the execution to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.protectedRoute = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};
