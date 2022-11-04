const User = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;

  const user = await User.findOne({ email }, { email: true });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const result = await User.create({
    password,
    email,
    subscription,
    avatarURL,
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
