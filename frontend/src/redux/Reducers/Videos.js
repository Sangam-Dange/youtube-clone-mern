import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const getAllVideoPostsReducer = createReducer(initialState, {
  getAllVideoPostRequest: (state) => {
    state.loading = true;
  },
  getAllVideoPostSuccess: (state, action) => {
    state.loading = false;
    state.videoPosts = action.payload;
  },
  getAllVideoPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});
export const getSingleVideoPostsReducer = createReducer(initialState, {
  getSingleVideoPostRequest: (state) => {
    state.loading = true;
  },
  getSingleVideoPostSuccess: (state, action) => {
    state.loading = false;
    state.videoPost = action.payload;
  },
  getSingleVideoPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});
export const getSubbedVideoPostsReducer = createReducer(initialState, {
  getSubbedVideoPostRequest: (state) => {
    state.loading = true;
  },
  getSubbedVideoPostSuccess: (state, action) => {
    state.loading = false;
    state.subbedVideoPost = action.payload;
  },
  getSubbedVideoPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
});

export const likeUnlikeVideoReducer = createReducer(initialState, {
  LikeRequest: (state) => {
    state.loading = true;
  },
  LikeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  LikeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  GetAllLikesRequest: (state) => {
    state.loading = true;
  },
  GetAllLikesSuccess: (state, action) => {
    state.loading = false;
    state.allLikes = action.payload;
  },
  GetAllLikesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state, action) => {
    state.error = null;
  },
  clearMessage: (state, action) => {
    state.message = null;
  },
});

export const commentReducer = createReducer(initialState, {
  CommentRequest: (state) => {
    state.loading = true;
  },
  CommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  GetAllCommentsRequest: (state) => {
    state.loading = true;
  },
  GetAllCommentsSuccess: (state, action) => {
    state.loading = false;
    state.allComments = action.payload;
  },
  GetAllCommentsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteCommentRequest: (state) => {
    state.loading = true;
  },
  DeleteCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state, action) => {
    state.error = null;
  },
  clearMessage: (state, action) => {
    state.message = null;
  },
});
