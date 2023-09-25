const renameIdField = (object, isAggregated = false) => {
  const { _id, ...rest } = isAggregated ? object : object.toObject();

  //  aggregatedObject is not a Mongoose document, so object.toObject() won't work here

  return { id: _id.valueOf(), ...rest };
};

module.exports = {
  renameIdField,
};
