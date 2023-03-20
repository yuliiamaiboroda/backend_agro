const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createAccessToken = (payload) => jwt.sign(payload, JWT_SECRET);
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  createAccessToken,
  verifyToken,
};
