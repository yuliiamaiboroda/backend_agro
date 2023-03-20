const { createHttpException } = require("../helpers/create-http-exception");
const { UserModel } = require("../models");
const { verifyToken } = require("../services/auth");

const authUser = async (req, res, next) => {
  try {
    const unautorizationMessage = "Not authorized";
    const { authorization } = req.headers;
    if (!authorization) {
      throw createHttpException(401, unautorizationMessage);
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw createHttpException(401, unautorizationMessage);
    }
    try {
      const { userId } = verifyToken(token);

      const userInstanse = await UserModel.findById(userId);
      if (!userInstanse || !userInstanse.sessionKey) {
        throw createHttpException(401, unautorizationMessage);
      }
      req.user = userInstanse;
      next();
    } catch (error) {
      throw createHttpException(401, unautorizationMessage);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
