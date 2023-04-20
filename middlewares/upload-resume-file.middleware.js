const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../helpers/constants");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    // format: async (req, file) => "jpg",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: async (req, file) => uuidv4(),
  },
});

const resumeUploader = multer({ storage });

module.exports = { resumeUploader };
