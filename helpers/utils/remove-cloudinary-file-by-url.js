const { cloudinary } = require("../constants");

const getFileRelativePath = (url) => {
  const splitedURL = url.split("/");
  const publicId = splitedURL.pop().split(".")[0];
  const folderName = splitedURL.pop();
  return folderName + "/" + publicId;
};

const removeCloudinaryFileByURL = async (fileURL) => {
  if (!fileURL) {
    return { result: "ok" };
  }
  const filePath = getFileRelativePath(fileURL);
  return cloudinary.uploader.destroy(filePath);
};

module.exports = { removeCloudinaryFileByURL };
