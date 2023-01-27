import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExtendedHeader from "../../components/ExtendedHeader/ExtendedHeader";
import LandingVideos from "../../components/HomeScreen/LandingVideos";
import LeftMiniHeader from "../../components/LeftHeader/LeftHeader";
import SubHeader from "../../components/SubHeader/SubHeader";

import "./HomeScreen.scss";
import SubscriptionScreen from "../SubscriptionScreen/SubscriptionScreen";
import { Route, Routes } from "react-router-dom";
import { getAllVideos } from "../../redux/Actions/videoActions";
import { getSubscribedChannel } from "../../redux/Actions/userActions";

const HomeScreen = ({ currSideHeader }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideos());
    dispatch(getSubscribedChannel())
  }, [dispatch]);

  return (
    <div className="sideHeaders">
      {currSideHeader ? (
        <ExtendedHeader overhead={false} toggle={false} />
      ) : (
        <LeftMiniHeader />
      )}
      <div
        className={
          currSideHeader
            ? "sideContainer sideContainer-width-toggler"
            : "sideContainer "
        }
      >
        <SubHeader />
        <div className="routing__hDiv">
          <Routes>
            <Route
              path="/feed/subscriptions"
              element={<SubscriptionScreen />}
              exact
            />
            <Route path="/" element={<LandingVideos />} exact />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
