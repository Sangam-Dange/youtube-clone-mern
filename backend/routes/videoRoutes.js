const express = require("express");
const {
  createVideoPost,
  streamVideo,
  uploadVideo,
  getAllVideos,
  getVideo,
  likeUnline,
  addComment,
  getAllComments,
  deleteComment,
  getAllLikes,
  getSubbedChannelVideos,
} = require("../controllers/videoController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/video/post").post(isAuthenticated, createVideoPost);
router.route("/video/like/:videoId").get(isAuthenticated, likeUnline);
router.route("/video/subscribed").get(isAuthenticated, getSubbedChannelVideos);
router.route("/video/likes/:videoId").get(getAllLikes);
router
  .route("/video/comment/:videoId")
  .post(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment);
router.route("/video/comments/:videoId").get(getAllComments);
router.route("/video/upload").post(uploadVideo);
router.route("/video/stream/:id").get(streamVideo);
router.route("/allVideos").get(getAllVideos);
router.route("/video/:id").get(getVideo);

module.exports = router;
