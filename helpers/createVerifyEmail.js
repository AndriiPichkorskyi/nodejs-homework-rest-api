const generateTemplate = require("./emailTemplateFun");

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify email",
    // html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    html: generateTemplate(email, verificationToken),
  };

  return mail;
};

module.exports = createVerifyEmail;
