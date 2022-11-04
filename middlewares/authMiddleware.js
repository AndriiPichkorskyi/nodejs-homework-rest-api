const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const User = require("../models/users");

const authMiddleware = async function (req, res, next) {
  // step 1: check if param token exist
  const header = req.headers.authorization;
  if (!header) throw RequestError(401, "Pls provide a token");

  // step 2: check if token has 2 parts
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (tokenType !== "Bearer")
    throw RequestError(401, "Token type have to be a 'Bearer'");
  if (!token) throw RequestError(401, "Pls provide a token");

  // step 3: check if token can be decoded
  const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);

  if (tokenDecoded === null) throw RequestError(401, "Pls provide a token");

  // step 4: get User and compare with current token in the data base
  const user = await User.findById(tokenDecoded._id, [
    "-password",
    "-createdAt",
    "-updatedAt",
  ]);
  if (user === null)
    throw RequestError(401, "User is null, where did you get this token?");
  if (token !== user.token) throw RequestError(401, "Pls provide a token");

  // when everything alright: throw User next
  req.user = user;

  next();
};

module.exports = authMiddleware;
