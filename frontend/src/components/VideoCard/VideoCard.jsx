import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.scss";
const VideoCard = ({
  style,
  imgHeight,
  imgWidth,
  avatar,
  styleDetails,
  vp,
}) => {
  return (
    <Link
      to={`/watch/${vp._id}`}
      state={{ data: vp }}
      className="link__style"
      style={{ textDecoration: "none", color: "inherit", height: "260px" }}
    >
      <div className="vc__container" style={style}>
        <div
          className="th_image"
          style={{ height: imgHeight, width: imgWidth }}
        >
          <img
            src={vp?.thumbnail?.url}
            alt="thumbnail"
            className="thumbnail"
            style={{ height: imgHeight, width: imgWidth }}
          />
        </div>

        <div className="vc__bottom">
          {avatar && (
            <Avatar
              src={vp?.videoOwner?.avatar?.url}
              className="avatar"
              alt="User"
              sx={{ height: "2.5vmax", width: "2.5vmax" }}
            />
          )}
          <div className="vc__btDetails" style={styleDetails}>
            <h4>{vp?.title}</h4>
            <p className="channel__name">{vp?.videoOwner?.channelName}</p>
            <p className="views__age">
              33K views <span>·</span> 22 hours ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
