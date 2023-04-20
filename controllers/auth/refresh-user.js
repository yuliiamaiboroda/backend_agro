const { UnauthorizedError } = require("../../helpers/utils");
const { UserModel } = require("../../models");
const {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require("../../services/auth");
const crypto = require("crypto");

const refreshUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError();
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedError();
    }

    try {
      const { userId } = verifyRefreshToken(token);
      const userInstanse = await UserModel.findById(userId);
      if (!userInstanse) {
        throw new UnauthorizedError();
      }

      const sessionKey = crypto.randomUUID();

      await UserModel.findByIdAndUpdate(userInstanse._id, { sessionKey });

      const accessToken = createAccessToken({
        userId: userInstanse._id.toString(),
        sessionKey,
      });
      const refreshToken = createRefreshToken({
        userId: userInstanse._id.toString(),
      });

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  refreshUser,
};
