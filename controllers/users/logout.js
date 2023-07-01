const { UserModel } = require("../../models");

const logout = async (req, res, next) => {
  const { _id } = req.user;

  await UserModel.findByIdAndUpdate(_id, {
    sessionKey: null,
    refreshKey: null,
  });

  res.cookie("jwt", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(204).send();
};

module.exports = {
  logout,
};
