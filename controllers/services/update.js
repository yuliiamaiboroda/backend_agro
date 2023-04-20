const { ServicesModel } = require("../../models");

const update = async (req, res, next) => {
  const { serviceId } = req.params;
  const { title, description, image, price, contactMail, contactPhone } =
    req.body;

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
