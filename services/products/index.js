const { renameIdField } = require('../../helpers/utils');
const { ProductsModel } = require('../../models');

const getAll = async () => {
  const products = await ProductsModel.find();

  return products.map(product => renameIdField(product));
};

module.exports = { getAll };
