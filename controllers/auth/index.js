const current = require("./current");
const register = require("./register");
const login = require("./login");
const updateSubscription = require("./updateSubscription");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const verifyResending = require("./verifyResending");

module.exports = {
  current,
  login,
  register,
  updateSubscription,
  logout,
  updateAvatar,
  verify,
  verifyResending,
};
