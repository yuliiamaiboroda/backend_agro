const authenticationServices = require('../../services/authentication');

const getCurrentUser = async (req, res) => {
  const user = await authenticationServices.getCurrentUser(req.user);

  res.status(200).json(user);
};

const login = async (req, res) => {
  const userData = await authenticationServices.login(req.body);

  res.cookie('jwt', userData.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken: userData.accessToken,
    user: userData.user,
  });
};

const logout = async (req, res) => {
  await authenticationServices.logout(req.user.id);

  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(204).send();
};

const refreshUser = async (req, res) => {
  const userData = await authenticationServices.refreshUser(req);

  res.cookie('jwt', userData.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken: userData.accessToken });
};

const restorePassword = async (req, res) => {
  await authenticationServices
    .restorePassword(req.body.email)
    .then(res.status(200).send('your new password sent via email'))
    .catch(err => {
      throw new Error(`${err}`);
    });
};

const updateOwnPassword = async (req, res) => {
  await authenticationServices.updateOwnPassword(req.user.id, req.body);

  res.status(200).send('Password changed successfully');
};

module.exports = {
  getCurrentUser,
  login,
  logout,
  refreshUser,
  restorePassword,
  updateOwnPassword,
};
