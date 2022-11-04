const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  let { page = 1, limit = 20, favorite = false } = req.query;
  limit = limit > 20 ? 20 : limit;
  const toSkip = page * limit - limit;

  const result = await Contact.find({
    owner: _id,
    favorite,
  })
    .skip(toSkip)
    .limit(limit);

  res.json(result);
};

module.exports = getAll;
