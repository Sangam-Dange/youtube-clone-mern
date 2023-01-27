const userModel = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken.js");
const { sendCookieAndRes } = require("../utils/sendCookieAndRes.js");
const cloudinary = require("cloudinary");

//! --------------------------------------------------------------------------------

//? @desc     Registering new user
//? @route    Post /api/v1/users/register
//? @access   Public

exports.register = async (req, res) => {
  try {
    const { name, channelName, avatar, email, password } = req.body;

    let user = await userModel.findOne({ email });
    let cName = await userModel.findOne({ channelName });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (cName) {
      return res
        .status(400)
        .json({ success: false, message: "ChannelName already exists" });
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    user = await userModel.create({
      name,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
      channelName,
      email,
      password,
    });

    const token = await generateToken(user._id);

    sendCookieAndRes(res, 201, true, user, token);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     Auth user & get token
//? @route    Post  /api/v1/users/login
//? @access   Public

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = await generateToken(user._id);

    sendCookieAndRes(res, 200, true, user, token);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     logout user
//? @route    Get  /api/v1/users/logout
//? @access   Public

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "User Logged out" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     user profile
//? @route    Get  /api/v1/profile/me
//? @access   private

exports.getMyProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("subscribed", "name channelName avatar email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! --------------------------------------------------------------------------------
//? @desc     Subscribe Channel
//? @route    get /api/v1/users/subscribe/channel/:channelId
//? @access   Private

exports.subscribeChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const currentUserId = req.user._id;

    //channel that current logged in user is going tio follow
    const channel = await userModel.findById(channelId);

    const currentLoggedInUser = req.user;

    if (channelId === currentUserId.toString()) {
      return res.status(200).json({
        success: false,
        message: "You cant subscribe your own channel",
      });
    }

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel Not found or some technical error occurred",
      });
    }

    if (currentLoggedInUser.subscribed.includes(channel._id)) {
      // index of channel id inside currentUser (me) subscribed
      const indexOfSubscribed = currentLoggedInUser.subscribed.indexOf(
        channel._id
      );
      currentLoggedInUser.subscribed.splice(indexOfSubscribed, 1);

      // index of current user id (me) inside channels subscribers
      const indexOfSubscribers = channel.subscribers.indexOf(currentUserId);
      channel.subscribers.splice(indexOfSubscribers, 1);

      await channel.save();
      await currentLoggedInUser.save();
      return res.status(200).json({
        success: true,
        message: "Subscription removed",
        subscribed: false,
      });
    } else {
      channel.subscribers.push(currentUserId);
      currentLoggedInUser.subscribed.push(channel._id);

      await channel.save();
      await currentLoggedInUser.save();
      return res.status(200).json({
        success: true,
        message: "Subscription added",
        subscribed: true,
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
//? @desc     get subscribed channel
//? @route    Get  /api/v1/users/subscribed
//? @access   Private

exports.getSubscribedChannel = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("subscribed", "name channelName avatar email");

    return res.status(200).json({
      success: true,
      message: "Subscription added",
      subscribedChannel: user.subscribed,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
