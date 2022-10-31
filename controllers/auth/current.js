const current = async (req, res) => {
  res.status(401).json(req.user);
};

module.exports = current;
