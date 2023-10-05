const { UnauthorizedError } = require('../helpers/utils/');
const { UserModel } = require('../models');
const { verifyToken } = require('../services/tokens');

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError();
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedError();
    }
    try {
      const { userId, sessionKey } = verifyToken(token);

      const userInstanse = await UserModel.findById(userId);
      if (!userInstanse || !userInstanse.sessionKey) {
        throw new UnauthorizedError();
      }
      if (sessionKey !== userInstanse.sessionKey) {
        throw new UnauthorizedError();
      }
      req.user = userInstanse;
      next();
    } catch (error) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
