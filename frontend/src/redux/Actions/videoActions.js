import axios from "axios";
const Url = "/api/v1/videos";

export const getAllVideos = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllVideoPostRequest",
    });

    const { data } = await axios.get(Url + `/allVideos`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "getAllVideoPostSuccess",
      payload: data.allVideos,
    });

    return true;
  } catch (error) {
    dispatch({
      type: "getAllVideoPostFailure",
      payload: error.response.data.message,
    });

    return false;
  }
};
export const getSingleVideo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getSingleVideoPostRequest",
    });

    const { data } = await axios.get(Url + `/video/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "getSingleVideoPostSuccess",
      payload: data.videoData,
    });

    return true;
  } catch (error) {
    dispatch({
      type: "getSingleVideoPostFailure",
      payload: error.response.data.message,
    });

    return false;
  }
};
export const getSubbedVideos = () => async (dispatch) => {
  try {
    dispatch({
      type: "getSubbedVideoPostRequest",
    });

    const { data } = await axios.get(Url + `/video/subscribed`, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "getSubbedVideoPostSuccess",
      payload: data.subscribedVideos,
    });

    return true;
  } catch (error) {
    dispatch({
      type: "getSubbedVideoPostFailure",
      payload: error.response.data.message,
    });

    return false;
  }
};

export const likeUnlikeVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: "LikeRequest",
    });

    const { data } = await axios.get(Url + `/video/like/${videoId}`);

    dispatch({
      type: "LikeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LikeFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllLikes = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllLikesRequest",
    });

    const { data } = await axios.get(Url + `/video/likes/${videoId}`);

    dispatch({
      type: "GetAllLikesSuccess",
      payload: data.likes,
    });
  } catch (error) {
    dispatch({
      type: "GetAllLikesFailure",
      payload: error.response.data.message,
    });
  }
};

export const addComment = (videoId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "CommentRequest",
    });

    const { data } = await axios.post(
      Url + `/video/comment/${videoId}`,
      { comment },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: "CommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CommentFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllComments = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllCommentsRequest",
    });

    const { data } = await axios.get(Url + `/video/comments/${videoId}`);

    dispatch({
      type: "GetAllCommentsSuccess",
      payload: data.comments,
    });
  } catch (error) {
    dispatch({
      type: "GetAllCommentsFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteComment = (videoId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteCommentRequest",
    });
    console.log(commentId);
    const { data } = await axios.delete(Url + `/video/comment/${videoId}`, {
      data: { commentId },
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "DeleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};
