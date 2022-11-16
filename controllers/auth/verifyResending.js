const User = require("../../models/users");
const RequestError = require("../../helpers/RequestError");

const { sendEmail, createVerifyEmail } = require("../../helpers");

const verifyResending = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }

  const { verificationToken } = user;

  if (verificationToken) {
    const message = createVerifyEmail(email, verificationToken);
    await sendEmail(message);

    res.json({
      message: "Verification email sent",
    });
  } else {
    res.json({
      message: "Verification has already been passed",
    });
  }
};

module.exports = verifyResending;
