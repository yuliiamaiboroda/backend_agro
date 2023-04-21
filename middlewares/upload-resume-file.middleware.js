const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../helpers/constants");
const { CustomHttpException } = require("../helpers/utils");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    resource_type: "image",
    allowed_formats: ["pdf"],
    public_id: async (req, file) => uuidv4(),
  },
});

const uploader = multer({ storage }).single("resume");

const resumeUploader = (req, res, next) => {
  return uploader(req, res, (error) => {
    try {
      if (error instanceof multer.MulterError) {
        throw new Error("multer error");
      }
      if (error && error.http_code) {
        throw new CustomHttpException({
          status: error.http_code,
          message: error.message,
        });
      }
      if (error) {
        next(error);
      }
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { resumeUploader };
