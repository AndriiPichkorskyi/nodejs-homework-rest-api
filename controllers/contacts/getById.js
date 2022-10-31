const RequestError = require("../../helpers/RequestError");
const Contact = require("../../models/contact");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOne({ _id: contactId, owner: _id });
  if (result === null)
    throw RequestError(404, `There are no contacts with id: ${contactId}`);

  res.json(result);
};

module.exports = getById;
