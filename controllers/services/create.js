const { ServicesModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const create = async (req, res, next) => {
  const { role } = req.user;
  const { title, description, image, price, contactMail, contactPhone } =
    req.body;

  console.log("req >>>>", req);
  console.log("req.user >>>>", req.user);
  console.log("req.body >>>>", req.body);

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const result = await ServicesModel.create({
    title,
    description,
    image,
    price,
    contactMail,
    contactPhone,
  });

  res.status(201).json(result);
};

module.exports = {
  create,
};
