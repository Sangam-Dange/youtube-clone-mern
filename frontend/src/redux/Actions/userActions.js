import axios from "axios";
const Url = "/api/v1/users";

export const registerUser =
  (name, channelName, avatar, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        Url + `/register`,
        { name, channelName, avatar, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });

      return true;
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });

      return false;
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      Url + `/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });

    return true;
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });

    return false;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });

    await axios.get(Url + `/logout`);

    dispatch({
      type: "LogoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
  }
};
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(Url + `/profile/me`);

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const subscribeChannel = (channelId) => async (dispatch) => {
  try {
    dispatch({
      type: "SubscribeChannelRequest",
    });

    const { data } = await axios.get(Url + `/subscribe/channel/${channelId}`);

    dispatch({
      type: "SubscribeChannelSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "SubscribeChannelFailure",
      payload: error.response.data.message,
    });
  }
};
export const getSubscribedChannel = () => async (dispatch) => {
  try {
    dispatch({
      type: "getSubscribedChannelRequest",
    });

    const { data } = await axios.get(Url + `/subscribed`);

    dispatch({
      type: "getSubscribedChannelSuccess",
      payload: data.subscribedChannel,
    });
  } catch (error) {
    dispatch({
      type: "getSubscribedChannelFailure",
      payload: error.response.data.message,
    });
  }
};
