import React, { useEffect } from "react";
import VideoPlayer from "../../components/VideoWatchingScreen/VideoPlayer";
import "./VideoWatchingScreen.scss";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { RiPlayListAddFill, RiShareForwardLine } from "react-icons/ri";
import { HiOutlineScissors } from "react-icons/hi";
import { TfiDownload } from "react-icons/tfi";
import { useState } from "react";
import ExtendedHeader from "../../components/ExtendedHeader/ExtendedHeader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import SubHeader from "../../components/SubHeader/SubHeader";
import VideoCard from "../../components/VideoCard/VideoCard";
import { MdOutlineSort } from "react-icons/md";
import { Avatar, Button } from "@mui/material";
import CommentCard from "../../components/CommentCard/CommentCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getAllComments,
  getAllLikes,
  getAllVideos,
  getSingleVideo,
  likeUnlikeVideo,
} from "../../redux/Actions/videoActions";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import { showToast } from "../../utils/toast";

const VideoWatchingScreen = ({ currSideHeader, setCurrSideHeader }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [toggleCinema, setToggleCinema] = useState(false);
  const [toggleCommentPannel, setToggleCommentPannel] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  const { loading, error, videoPosts } = useSelector(
    (state) => state.getAllVideos
  );

  // getting current video data
  const params = useParams();
  const videoId = params.id;

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getAllComments(videoId));
    dispatch(getAllLikes(videoId));
  }, [dispatch, videoId]);

  const { videoPost } = useSelector((state) => state.getSingleVideo);

  useEffect(() => {
    setCurrSideHeader(true);
  }, []);

  const { user } = useSelector((state) => state.user);

  let desc = videoPost?.description;

  const { message } = useSelector((state) => state.subscribeChannel);

  useEffect(() => {
    if (message) {
      showToast(Toastify, message, dispatch);
    }
    // eslint-disable-next-line
  }, [message]);

  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(addComment(videoId, comment));
    dispatch(getAllComments(videoId));
  };
  const {
    allComments,
    message: commentMessage,
    error: comError,
  } = useSelector((state) => state.comment);

  useEffect(() => {
    if (commentMessage) {
      showToast(Toastify, commentMessage, dispatch);
    }
    if (comError) {
      showToast(Toastify, comError, dispatch);
    }
    // eslint-disable-next-line
  }, [commentMessage, comError]);
  const handleLike = async () => {
    setIsLiked(!isLiked);
    await dispatch(likeUnlikeVideo(videoPost?._id));
    dispatch(getAllLikes(videoId));
  };

  useEffect(() => {
    if (videoPost?.likes?.includes(user?._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [videoPost?.likes, user?._id]);

  const handleDisLike = () => {
    setIsDisLiked(!isDisLiked);
  };

  const { allLikes, message: likeMessage } = useSelector((state) => state.like);
  useEffect(() => {
    if (likeMessage) {
      showToast(Toastify, likeMessage, dispatch);
    }
    // eslint-disable-next-line
  }, [likeMessage]);
  return (
    <div className="watchingScreen__wrapper">
      <ExtendedHeader overhead={true} toggle={!currSideHeader} />

      <div className="video_div" style={{ paddingLeft: toggleCinema && "0px" }}>
        <VideoPlayer
          toggleCinema={toggleCinema}
          setToggleCinema={setToggleCinema}
          videoId={videoPost?.video?._id}
          videoPost={videoPost}
        />
      </div>

      <div className="watchingScreen__innerDiv">
        <div className={`ws__left ${toggleCinema ? "toggle-margin-top" : ""}`}>
          <div className="information__container">
            <div className="hashtags">
              <p>{videoPost?.hashTags}</p>
            </div>
            <div className="vdo__title">
              <h3>{videoPost?.title}</h3>
            </div>
            <div className="views__likes">
              <p className="views">
                34,807 views <span>·</span> 31 Dec 2022
              </p>
              <div className="menu__container">
                <div className="likes" onClick={handleLike}>
                  {isLiked ? (
                    <AiFillLike fontSize={"25px"} color="#fff" />
                  ) : (
                    <AiOutlineLike fontSize={"25px"} color="#fff" />
                  )}
                  <h4>{allLikes?.length}</h4>
                </div>
                <div className="dislikes" onClick={handleDisLike}>
                  {isDisLiked ? (
                    <AiFillDislike fontSize={"24px"} color="#fff" />
                  ) : (
                    <AiOutlineDislike fontSize={"24px"} color="#fff" />
                  )}
                  <h4>DISLIKE</h4>
                </div>
                <div className="share">
                  <RiShareForwardLine fontSize={"25px"} color="#fff" />
                  <h4>SHARE</h4>
                </div>
                <div className="download">
                  <TfiDownload fontSize={"18px"} color="#fff" />
                  <h4>DOWNLOAD</h4>
                </div>
                <div className="clip">
                  <HiOutlineScissors fontSize={"25px"} color="#fff" />
                  <h4>CLIP</h4>
                </div>
                <div className="save">
                  <RiPlayListAddFill fontSize={"20px"} color="#fff" />
                  <h4>SAVE</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="description__container">
            <ProfileCard
              avHeight={"2.5vmax"}
              avWidth={"2.5vmax"}
              avUrl={videoPost?.videoOwner.avatar.url}
              style={{ paddingLeft: "0px", marginTop: "10px", hover: "none" }}
              extended={true}
              classStyle={""}
              videoOwner={videoPost?.videoOwner}
            />

            <p className="video__description">
              <>{showMore ? desc : desc?.substring(0, 250) + "......."}</>
              <br />

              <br />
              <span onClick={() => setShowMore(!showMore)}>
                {showMore ? "SHOW LESS" : "SHOW MORE"}
              </span>
            </p>
          </div>

          <br />

          <div className="comment__container">
            <div className="c__top">
              <h3>240 Comments</h3>

              <div className="filters">
                <MdOutlineSort fontSize={"25px"} color="#fff" />

                <h3>SORT BY</h3>
              </div>
            </div>

            <div className="comment__box">
              <Avatar
                src={user?.avatar?.url}
                className="avatar"
                alt="User"
                sx={{ height: "2.5vmax", width: "2.5vmax" }}
              />
              <div className="c__innerDiv">
                <input
                  placeholder="add a comment..."
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onClick={() => setToggleCommentPannel(true)}
                />
                {toggleCommentPannel && (
                  <div className="button__innerDiv">
                    <Button
                      variant="text"
                      onClick={() => {
                        setToggleCommentPannel(false);
                        setComment("");
                      }}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!comment}
                      style={{ color: comment ? "black" : "grey" }}
                      onClick={handleComment}
                    >
                      COMMENT
                    </Button>
                  </div>
                )}
              </div>

              <div></div>
            </div>
            <Button
              variant="outlined"
              onClick={() => setShowComments(!showComments)}
              style={{ marginBottom: "20px", display: "none" }}
              className="mobile__hide_commentBtn"
            >
              {showComments ? "HIDE COMMENTS" : " SHOW COMMENTS"}
            </Button>

            <div
              className={`c__bottom mobile__hide_comment ${
                showComments ? "mobile__show_comment" : ""
              }`}
            >
              {allComments?.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <p>No Comments</p>
                </div>
              ) : (
                allComments?.map(({ user, comment, _id }, i) => {
                  return (
                    <CommentCard
                      commentUser={user}
                      comment={comment}
                      videoOwner={videoPost?.videoOwner}
                      videoId={videoId}
                      key={_id}
                      commentId={_id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className={`ws__right ${toggleCinema ? "toggle-margin-top" : ""}`}>
          <SubHeader />
          <br />
          {videoPosts?.map((vp, i) => {
            return (
              <VideoCard
                key={vp._id}
                vp={vp}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  height: "100px",
                  width: "100%",
                  alignItems: "flex-start",
                }}
                imgHeight={"100%"}
                imgWidth={"180px"}
                avatar={false}
                styleDetails={{ marginTop: "-10px" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoWatchingScreen;
