const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
      minlength: [10, "title must be at least 10 characters"],
    },
    description: String,
    thumbnail: {
      public_id: String,
      url: String,
    },
    hashTags: String,
    video: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      length: { type: Number, required: true },
    },
    videoOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const VideoModel = mongoose.model("Video", videoSchema);
module.exports = VideoModel;
