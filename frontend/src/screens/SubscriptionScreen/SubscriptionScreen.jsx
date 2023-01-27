import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WrapperContainer from "../../components/HomeScreen/WrapperContainer";
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
import VideoCard from "../../components/VideoCard/VideoCard";
import { getSubbedVideos } from "../../redux/Actions/videoActions";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubbedVideos());
  }, [dispatch]);
  const { loading, error, subbedVideoPost } = useSelector(
    (state) => state.subbedVideos
  );
  return (
    <WrapperContainer>
      {loading ? (
        <LoadingSpinner />
      ) : subbedVideoPost?.length > 0 ? (
        subbedVideoPost?.map((vp, i) => {
          return <VideoCard avatar={true} key={vp._id} vp={vp} />;
        })
      ) : (
        <div style={{ width: "100%", textAlign: "center", marginTop: "50px" }}>
          No channel subscribed
          <br />
          <br />
          please subscribe channels to watch interesting content
        </div>
      )}
    </WrapperContainer>
  );
};

export default SubscriptionScreen;
