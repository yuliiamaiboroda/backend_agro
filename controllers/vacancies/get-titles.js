const { VacancyModel } = require("../../models");

const getTitles = async (req, res) => {
  const titles = await VacancyModel.find({}, { title: 1 });

  res.status(200).json(titles);
};

module.exports = { getTitles };
