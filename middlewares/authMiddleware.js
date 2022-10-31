const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const User = require("../models/users");

const authMiddleware = async function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) throw RequestError(401, "Pls provide a token");

  const [tokenType, token] = req.headers.authorization.split(" ");
  if (tokenType !== "Bearer")
    throw RequestError(401, "Token type have to be a 'Bearer'");
  if (!token) throw RequestError(401, "Pls provide a token");

  const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);
  if (tokenDecoded === null) throw RequestError(401, "Pls provide a token");

  const user = await User.findById(tokenDecoded.userId, [
    "-password",
    "-createdAt",
    "-updatedAt",
  ]);
  if (token !== user.token) throw RequestError(401, "Pls provide a token");

  req.user = user;
  next();
};

module.exports = authMiddleware;
