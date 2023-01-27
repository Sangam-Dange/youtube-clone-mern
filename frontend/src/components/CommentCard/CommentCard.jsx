import { Avatar } from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./CommentCard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllComments,
} from "../../redux/Actions/videoActions";

const CommentCard = ({
  commentUser,
  comment,
  videoId,
  commentId,
  videoOwner,
}) => {
  const { user: currentLoggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleCommentDelete = async () => {
    await dispatch(deleteComment(videoId, commentId));
    dispatch(getAllComments(videoId));
  };

  return (
    <div className="CommentCard__container">
      <Avatar
        src={commentUser?.avatar.url}
        className="avatar"
        alt="User"
        sx={{ height: "2.5vmax", width: "2.5vmax" }}
      />
      <div>
        <h5>
          {commentUser?.name} <span>18 hours ago</span>
        </h5>
        <p>{comment}</p>
      </div>
      <DeleteOutlineIcon
        fontSize="small"
        className="del__icon"
        style={{
          display:
            currentLoggedInUser?._id === commentUser?._id ||
            currentLoggedInUser?._id === videoOwner?._id
              ? "block"
              : "none",
        }}
        onClick={handleCommentDelete}
      />
    </div>
  );
};

export default CommentCard;
