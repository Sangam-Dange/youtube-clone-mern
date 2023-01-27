const { default: mongoose, mongo, isValidObjectId } = require("mongoose");
const userModel = require("../models/UserModel");
const VideoModel = require("../models/VideoModel");
const fs = require("fs");
const path = require("path");

//! --------------------------------------------------------------------------------
//? @desc     uploading video to database
//? @route    Post /api/v1/videos/video/upload
//? @access   Private
exports.uploadVideo = async (req, res) => {
  try {
    const gridFSBucket = await new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: "videos",
      }
    );
    const videoUploadStream = await gridFSBucket.openUploadStream(
      "waterfall video by sugam dange"
    );
    const videoReadStream = fs.createReadStream(
      path.join(__dirname, "../../uploads/video.mp4")
    );
    videoReadStream.pipe(videoUploadStream);
    console.log(videoUploadStream.id);

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     creating video post
//? @route    Post /api/v1/videos/video/post
//? @access   Private

exports.createVideoPost = async (req, res) => {
  try {
    const { title, description, hashTags, currentVideoId, thumbUrl } = req.body;

    // title, description, hashTags, currentVideoId put validation for this all four

    if (!currentVideoId) {
      return res.status(404).json({
        success: false,
        message: "Technical error occurred! Please refresh page",
      });
    }

    const getVideoCollection = await mongoose.connection.db.collection(
      "videos.files"
    );

    console.log(currentVideoId);

    const currentVideo = await getVideoCollection.findOne({
      _id: mongoose.mongo.ObjectId(currentVideoId),
    });

    if (!currentVideo) {
      return res
        .status(404)
        .json({ success: false, message: "No video uploaded!" });
    }
    const newVideoData = {
      title,
      description,
      hashTags,
      thumbnail: {
        public_id: "myCloud.public_id",
        url: thumbUrl,
      },
      video: {
        _id: currentVideo._id,
        length: currentVideo.length,
      },
      videoOwner: req.user._id,
    };

    const newVideoPost = await VideoModel.create(newVideoData);
    const user = await userModel.findById(req.user._id);

    user.uploadedVideos.unshift(newVideoPost._id);
    await user.save();

    res.status(201).json({
      success: true,
      videoPost: newVideoPost,
      message: "Video Post Created ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     streaming video
//? @route    get /api/v1/videos/video/stream/:id
//? @access   Public

exports.streamVideo = async (req, res) => {
  try {
    const range = req.headers.range;

    if (!range) {
      res.status(400).send("Request Range Header");
    }

    if (!req.params.id) {
      return res
        .status(404)
        .json({ success: false, message: "Technical error occurred " });
    }

    const getVideo = await mongoose.connection.db.collection("videos.files");
    var hex = /[0-9A-Fa-f]{6}/g;
    let id = req.params.id.trim();
    id = hex.test(id) ? mongoose.mongo.ObjectId(id) : id;

    const currentVideo = await getVideo.findOne({
      _id: id,
    });
    if (!currentVideo) {
      return res.status(404).send("No video uploaded!");
    }

    const videoSize = currentVideo.length;

    const start = Number(range?.replace(/\D/g, ""));
    // console.log("st", start);
    const chunkSize = currentVideo.chunkSize; //1mb
    // console.log(chunkSize);
    const end = videoSize - 1;
    // console.log("end", end);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start} - ${end}/ ${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    // const readStream = fs.createReadStream(videoPath, { start, end });
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "videos",
    });

    const downloadStream = await bucket.openDownloadStream(currentVideo._id, {
      start,
      end,
    });
    // downloadStream.on("readable", () => {
    downloadStream.pipe(res);
    // });
  } catch (error) {
    console.log(error);
  }
};

//! --------------------------------------------------------------------------------
//? @desc     fetch all videos
//? @route    get /api/v1/videos/allVideos
//? @access   Public

exports.getAllVideos = async (req, res) => {
  try {
    const allVideos = await VideoModel.find({}).populate("videoOwner");

    res.status(200).json({
      success: true,
      allVideos,
      message: "Videos fetched successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     fetch single videos
//? @route    Get /api/v1/videos/video/:id
//? @access   Public

exports.getVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(
      mongoose.mongo.ObjectId(req.params.id)
    ).populate("videoOwner");

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "No video data found" });
    }

    res.status(200).json({
      success: true,
      videoData: video,
      message: "Video fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     like Unlike Video
//? @route    get /api/v1/videos/video/like/:videoId
//? @access   Private

exports.likeUnline = async (req, res) => {
  try {
    const { videoId } = req.params;
    const currentUser = req.user._id;

    const videoPost = await VideoModel.findById(videoId);

    if (!videoPost) {
      return res.status(404).json({
        success: false,
        message: "Video Not found or some technical error occurred",
      });
    }

    if (videoPost.likes.includes(currentUser)) {
      const index = videoPost.likes.indexOf(currentUser);

      videoPost.likes.splice(index, 1);
      await videoPost.save();
      return res.status(200).json({
        success: true,
        message: "Video Unliked",
      });
    } else {
      videoPost.likes.push(currentUser);
      await videoPost.save();
      return res.status(200).json({
        success: true,
        message: "Video Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     getting all likes
//? @route    get /api/v1/videos/video/likes/:videoId
//? @access   Public

exports.getAllLikes = async (req, res) => {
  try {
    const { videoId } = req.params;
    const videoPost = await VideoModel.findById(videoId, {
      likes: 1,
    });

    if (!videoPost) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      likes: videoPost.likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     comment on video
//? @route    POST /api/v1/videos/video/comment/:videoId
//? @access   Private

exports.addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const currentUser = req.user._id;
    const { comment } = req.body;
    const videoPost = await VideoModel.findById(videoId);
    if (!videoPost) {
      return res.status(404).json({
        success: false,
        message: "Video Not found or some technical error occurred",
      });
    }

    let commentIndex = -1;
    // checking if the comment already exist
    videoPost.comments.forEach(({ user, comment }, i) => {
      if (currentUser.toString() === user.toString()) {
        commentIndex = i;
      }
    });

    if (commentIndex !== -1) {
      videoPost.comments[commentIndex].comment = comment;
      videoPost.comments[commentIndex].updatedAt = Date.now();

      await videoPost.save();
      res.status(200).json({
        success: true,
        message: "comment updated",
      });
    } else {
      let newComment = {
        user: currentUser,
        comment,
      };

      videoPost.comments.push(newComment);
      await videoPost.save();
      res.status(200).json({
        success: true,
        message: "comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     getting all comments
//? @route    get /api/v1/videos/video/comments/:videoId
//? @access   Public

exports.getAllComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const videoPost = await VideoModel.findById(videoId, {
      comments: 1,
    }).populate("comments.user", "name avatar.url");

    if (!videoPost) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      comments: videoPost.comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     deleting comment
//? @route    delete /api/v1/videos/video/comment/:videoId
//? @access   Private

exports.deleteComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const currentUser = req.user._id;
    const videoPost = await VideoModel.findById(videoId);

    if (!videoPost) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    //checking if owner is deleting the comment

    let message = "";
    if (currentUser.toString() === videoPost.videoOwner.toString()) {
      if (!req.body.commentId) {
        res.status(400).json({
          success: false,
          message: "comment Id is required",
        });
      }

      videoPost.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId) {
          return videoPost.comments.splice(index, 1);
        }
      });

      message = "selected comment has deleted successfully";
    } else {
      videoPost.comments.forEach((item, index) => {
        if (item.user.toString() === currentUser.toString()) {
          return videoPost.comments.splice(index, 1);
        }
      });

      message = "your comment has deleted successfully";
    }

    await videoPost.save();
    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     getting subscribed channel videos
//? @route    get /api/v1/videos/video/subscribed
//? @access   Private

exports.getSubbedChannelVideos = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const user = await userModel.findById(currentUserId);

    const subbedVideoPosts = await VideoModel.find({
      videoOwner: {
        $in: user.subscribed,
      },
    }).populate("videoOwner", "avatar channelName");

    res.status(200).json({
      success: true,
      subscribedVideos: subbedVideoPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
