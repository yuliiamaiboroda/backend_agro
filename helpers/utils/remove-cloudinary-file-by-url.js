const { cloudinary } = require("../constants");
const { CloudinaryFailedError } = require("./http-exceptions");

const removeCloudinaryFileByURL = async (fileURL) => {
  if (!fileURL) {
    return;
  }
  const splitedURL = fileURL.split("/").slice(4);
  const [resourceType, type, , folder, fileName] = splitedURL;
  const filePath = folder + "/" + fileName.split(".")[0];

  const { result } = await cloudinary.uploader.destroy(filePath, {
    resource_type: resourceType,
    type,
    invalidate: true,
  });
  if (result !== "ok") {
    throw new CloudinaryFailedError();
  }
};

module.exports = { removeCloudinaryFileByURL };
