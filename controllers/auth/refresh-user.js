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
    const { cookies } = req;

    if (!cookies) {
      throw new UnauthorizedError();
    }

    const { jwt } = cookies;

    if (!jwt) {
      throw new UnauthorizedError();
    }

    const token = req.cookies.jwt;

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

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        accessToken,
      });
    } catch (err) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  refreshUser,
};
