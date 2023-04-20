const { ServicesModel } = require("../../models");

const create = async (req, res, next) => {
  const { title, description, image, price, contactMail, contactPhone } =
    req.body;

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
