const getAll = async (req, res) => {
  res.status(200).json({ message: "Get all success" });
};

module.exports = { getAll };
