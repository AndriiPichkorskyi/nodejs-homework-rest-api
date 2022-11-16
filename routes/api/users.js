const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const {
  validateBody,
  authMiddleware,
  uploadAvatarMiddleware,
} = require("../../middlewares");
const userSchema = require("../../schemas/user");
const verifySchema = require("../../schemas/verify");
const ctrl = require("../../controllers/auth");
const subscriptionSchema = require("../../schemas/subscription");

const router = express.Router();

router.post("/register", validateBody(userSchema), ctrlWrapper(ctrl.register));
router.post("/login", validateBody(userSchema), ctrlWrapper(ctrl.login));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post(
  "/verify/",
  validateBody(verifySchema),
  ctrlWrapper(ctrl.verifyResending)
);

router.use(ctrlWrapper(authMiddleware));

router.get("/current", ctrlWrapper(ctrl.current));
router.patch(
  "/current",
  validateBody(subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.all("/logout", ctrlWrapper(ctrl.logout));

router.patch(
  "/avatar",
  uploadAvatarMiddleware(),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
