const validateBody = require("./validateBody");
const uploadAvatarMiddleware = require("./uploadAvatarMiddleware");
const authMiddleware = require("./authMiddleware");

module.exports = {
  validateBody,
  uploadAvatarMiddleware,
  authMiddleware,
};
