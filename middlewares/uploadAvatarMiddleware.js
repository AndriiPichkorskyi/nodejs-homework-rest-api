const multer = require("multer");
const path = require("path");

const tempDir = path.join("./temp");
const fieldName = "avatar";

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const uploadAvatarMiddleware = function () {
  return upload.single(fieldName);
};

module.exports = uploadAvatarMiddleware;
