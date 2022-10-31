const Contact = require("../../models/contact");

const add = async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;

  const result = await Contact.create({
    favorite: false,
    ...body,
    owner: _id,
  });
  res.status(201).json(result);
};

module.exports = add;
