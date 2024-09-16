const jwt = require("jsonwebtoken");
const { generateNewToken } = require("../service/auth.service");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;

    let newToken = null;

    if (
      decoded.exp - 5 * 60 < Date.now() / 1000 &&
      decoded.exp > Date.now() / 1000
    ) {
      const generateToken = await generateNewToken(decoded);
      newToken = generateToken;
    }

    req.newToken = newToken;
    res.locals.token = newToken;
    next();
  });
};