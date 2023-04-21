const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../helpers/constants");
const { uploadFileWithErrorHandling } = require("../helpers/utils");

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

const resumeUploader = uploadFileWithErrorHandling(uploader);

module.exports = { resumeUploader };
