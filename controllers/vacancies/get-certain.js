const { RESPONSE_ERRORS } = require("../../helpers/constants");
const { createHttpException } = require("../../helpers/utils");
const { VacancyModel } = require("../../models");

const getCertain = async (req, res, next) => {
  const { id } = req.params;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  res.status(200).json(vacancy);
};

module.exports = { getCertain };
