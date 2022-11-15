const User = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const gravatar = require("gravatar");
const crypto = require("crypto");
const { sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;

  const user = await User.findOne({ email }, { email: true });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const verificationToken = crypto.randomBytes(16).toString("hex");
  console.log("verificationToken", verificationToken);

  const avatarURL = gravatar.url(email);
  const result = await User.create({
    password,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const message = createVerifyEmail(email, verificationToken);
  await sendEmail(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      // console.error(error);
      console.error(error.body.errors);
    });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

module.exports = register;
