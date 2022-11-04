const path = require("path");
const fs = require("fs/promises");
const User = require("../../models/users");
const Jimp = require("jimp");
const { RequestError } = require("../../helpers");

const avatarDir = path.join("public", "avatars");
const PORT = process.env.PORT || 3000;
const webAdress = `http://localhost:${PORT}`;

const updateAvatar = async function (req, res) {
  const { path: tempUploadDir, originalname } = req.file;
  const resultUploadDir = path.join(avatarDir, originalname);
  const user = req.user;

  // resize and save new avatar
  await Jimp.read(tempUploadDir)
    .then((avatar) => {
      return avatar.resize(250, 250).quality(60).write(resultUploadDir);
    })
    .catch((err) => {
      console.error(err);
      throw RequestError(500, { message: err.message });
    });

  // remove img from temp
  fs.unlink(tempUploadDir);

  // check if img is located on the Node JS server or on an other resurse
  if (user.avatarURL.includes(webAdress)) fs.unlink(user.avatarURL);

  // send request to the DB
  await User.findByIdAndUpdate(user._id, {
    avatarURL: resultUploadDir,
  });

  // create path for the client
  const imgPath = webAdress + resultUploadDir.substring(7); // remove subtring "public"

  res.status(200).json({ originalname, imgPath });
};

module.exports = updateAvatar;
