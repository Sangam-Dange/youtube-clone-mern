import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeChannel } from "../../redux/Actions/userActions";

import "./ProfileCard.scss";

const ProfileCard = ({
  avHeight,
  avWidth,
  avUrl,
  style,
  extended,
  classStyle,
  videoOwner,
}) => {
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const handleSubscribe = () => {
    if (user._id !== videoOwner._id) setIsSubscribed(!isSubscribed);
    dispatch(subscribeChannel(videoOwner?._id));
  };

  useEffect(() => {
    if (videoOwner?.subscribers?.includes(user?._id)) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [videoOwner, user]);

  return (
    <div className={`profile__container ${classStyle}`} style={style}>
      <Avatar
        src={avUrl}
        className="avatar"
        alt="User"
        sx={{ height: avHeight, width: avWidth }}
      />
      <div className="profile__innerDiv">
        <h5>
          {videoOwner ? videoOwner.channelName : ""}
          <br />
          {extended && (
            <span>{videoOwner?.subscribers?.length} subscribers</span>
          )}
        </h5>

        {extended && (
          <div className="join__sub">
            <Button variant="outlined">JOIN</Button>
            <Button
              variant="contained"
              color="error"
              className={isSubscribed ? "sub__style" : ""}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
