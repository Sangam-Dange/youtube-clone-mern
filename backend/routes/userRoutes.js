const express = require("express");
const {
  register,
  login,
  logout,
  getMyProfile,
  subscribeChannel,
  getSubscribedChannel,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router
  .route("/subscribe/channel/:channelId")
  .get(isAuthenticated, subscribeChannel);
router.route("/subscribed").get(isAuthenticated, getSubscribedChannel);
router.route("/profile/me").get(isAuthenticated, getMyProfile);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
