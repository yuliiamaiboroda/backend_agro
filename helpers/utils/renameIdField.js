const renameIdField = object => {
  const { _id, ...rest } = object.toObject();

  return { id: _id.valueOf(), ...rest };
};

module.exports = {
  renameIdField,
};
