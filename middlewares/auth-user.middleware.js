const { createHttpException } = require("../helpers/utils/");
const { RESPONSE_ERRORS } = require("../helpers/constants");
const { UserModel } = require("../models");
const { verifyToken } = require("../services/auth");

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createHttpException(RESPONSE_ERRORS.unauthorized);
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw createHttpException(RESPONSE_ERRORS.unauthorized);
    }
    try {
      const { userId, sessionKey } = verifyToken(token);

      const userInstanse = await UserModel.findById(userId);
      if (!userInstanse || !userInstanse.sessionKey) {
        throw createHttpException(RESPONSE_ERRORS.unauthorized);
      }
      if (sessionKey !== userInstanse.sessionKey) {
        throw createHttpException(RESPONSE_ERRORS.unauthorized);
      }
      req.user = userInstanse;
      next();
    } catch (error) {
      throw createHttpException(RESPONSE_ERRORS.unauthorized);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
