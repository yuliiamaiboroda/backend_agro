const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../helpers/constants");
const { uploadFileWithErrorHandling } = require("../helpers/utils");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: async (req, file) => uuidv4(),
  },
});

const uploader = multer({ storage }).single("image");

const productUploader = uploadFileWithErrorHandling(uploader);

module.exports = { productUploader };
