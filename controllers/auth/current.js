const current = async (req, res, next) => {
  const { email, password, name, surname, role } = req.user;

  res.status(200).json({ email, password, name, surname, role });
};

module.exports = {
  current,
};
