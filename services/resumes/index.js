const { ResumeModel } = require('../../models');
// const { renameIdField } = require('../../helpers/utils');

const createResume = async resume => {
  const {
    _id: id,
    name,
    phone,
    email,
    position,
    comment,
    isFavorite,
    createdAt,
  } = await ResumeModel.create(resume);

  return {
    id,
    name,
    phone,
    email,
    position,
    comment,
    isFavorite,
    createdAt,
  };
};

module.exports = {
  createResume,
};
