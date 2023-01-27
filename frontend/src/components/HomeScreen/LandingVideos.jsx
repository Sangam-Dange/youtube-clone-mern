import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../VideoCard/VideoCard";
import "./LandingVideo.scss";
import WrapperContainer from "./WrapperContainer";
const LandingVideos = () => {
  const { loading, error, videoPosts } = useSelector(
    (state) => state.getAllVideos
  );

  return (
    <WrapperContainer>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        videoPosts?.map((vp, i) => {
          return <VideoCard avatar={true} key={vp._id} vp={vp} />;
        })
      )}
    </WrapperContainer>
  );
};
 
export default LandingVideos;
