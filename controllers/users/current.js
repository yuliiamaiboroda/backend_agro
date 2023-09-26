// added
const current = async (req, res, next) => {
  const { email, name, surname, role } = req.user;

  res.status(200).json({ email, name, surname, role });
};

module.exports = {
  current,
};
