const { ServicesModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const update = async (req, res, next) => {
  const { role } = req.user;
  const { serviceId } = req.params;
  const { title, description, image, price, contactMail, contactPhone } =
    req.body;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  await ServicesModel.findByIdAndUpdate(serviceId, {
    title,
    description,
    image,
    price,
    contactMail,
    contactPhone,
  });
  res.status(200).send();
};

module.exports = {
  update,
};
