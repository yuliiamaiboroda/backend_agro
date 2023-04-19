const { ServicesModel } = require("../../models");
const { AccessDeniedError } = require("../../helpers/utils");

const create = async (req, res, next) => {
  const { role } = req.user;
  const { title, description, image, price, contactMail, contactPhone } =
    req.body;

  console.log("req >>>>", req);
  console.log("req.user >>>>", req.user);
  console.log("req.body >>>>", req.body);

  if (role !== "admin") {
    throw new AccessDeniedError();
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
