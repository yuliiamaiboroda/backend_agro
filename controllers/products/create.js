const create = async (req, res) => {
  res.status(201).json({ message: "New product created" });
};

module.exports = {
  create,
};
