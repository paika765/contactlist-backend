const jwt = require("jsonwebtoken");

function getUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decoded.id, email: decoded.email, name: decoded.name };
  } catch (err) {
    return null;
  }
}

module.exports = { getUserFromToken };
