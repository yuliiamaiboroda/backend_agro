const multer = require("multer");
const { CustomHttpException } = require("./http-exceptions");

const uploadFileWithErrorHandling = (uploader) => (req, res, next) => {
  return uploader(req, res, (error) => {
    try {
      if (error instanceof multer.MulterError) {
        throw new CustomHttpException({ status: 400, message: error.message });
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

module.exports = { uploadFileWithErrorHandling };
