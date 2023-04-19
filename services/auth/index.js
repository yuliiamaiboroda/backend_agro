const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_SECRET_REFRESH,
  JWT_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
} = process.env;

const createAccessToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

const createRefreshToken = (payload) =>
  jwt.sign(payload, JWT_SECRET_REFRESH, { expiresIn: JWT_REFRESH_EXPIRATION });

const verifyRefreshToken = (token) => jwt.verify(token, JWT_SECRET_REFRESH);

module.exports = {
  createAccessToken,
  verifyToken,
  createRefreshToken,
  verifyRefreshToken,
};
