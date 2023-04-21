const { cloudinary } = require("../constants");

const removeCloudinaryFileByURL = async (fileURL) => {
  if (!fileURL) {
    return { result: "ok" };
  }
  const splitedURL = fileURL.split("/").slice(4);
  const [resourceType, type, , folder, fileName] = splitedURL;
  const filePath = folder + "/" + fileName.split(".")[0];

  return cloudinary.uploader.destroy(filePath, {
    resource_type: resourceType,
    type,
    invalidate: true,
  });
};

module.exports = { removeCloudinaryFileByURL };
