import { configureStore } from "@reduxjs/toolkit";

import { userReducer, subscribeChannelReducer } from "./Reducers/User";
import {
  getAllVideoPostsReducer,
  getSingleVideoPostsReducer,
  commentReducer,
  likeUnlikeVideoReducer,
  getSubbedVideoPostsReducer,
} from "./Reducers/Videos";

const store = configureStore({
  reducer: {
    user: userReducer,
    getAllVideos: getAllVideoPostsReducer,
    getSingleVideo: getSingleVideoPostsReducer,
    subscribeChannel: subscribeChannelReducer,
    like: likeUnlikeVideoReducer,
    comment: commentReducer,
    subbedVideos: getSubbedVideoPostsReducer,
  },
});

export default store;
