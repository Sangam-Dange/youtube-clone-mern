import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "toastify-js/src/toastify.css";
import { getUserProfile } from "./redux/Actions/userActions";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen.jsx";
import Toastify from "toastify-js";
import SignUp from "./screens/SignUp/SignUp";
import Header from "./components/Header/Header";
import "./App.scss";
import SubscriptionScreen from "./screens/SubscriptionScreen/SubscriptionScreen";
import VideoWatchingScreen from "./screens/VideoWatchingScreen/VideoWatchingScreen";
import { showToast } from "./utils/toast";
import StudioScreen from "./screens/StudioScreen/StudioScreen";

function App() {
  const dispatch = useDispatch();
  const [currSideHeader, setCurrSideHeader] = useState(true);

  useEffect(() => {
    dispatch(getUserProfile());
    
  }, [dispatch]);

  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );

  // useEffect(() => {
  //   if (error) {
  //     showToast(Toastify, error, dispatch);
  //   }
  // }, [error, dispatch]);

  return (
    <Router>
      <div className="container">
        <Header
          currSideHeader={currSideHeader}
          setCurrSideHeader={setCurrSideHeader}
          isAuthenticated={isAuthenticated}
          user={user}
        />
        <main>
          <Routes>
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/signup" element={<SignUp />} exact />
            <Route path="/channel" element={<StudioScreen />} exact />
            <Route
              path="/watch/:id"
              element={
                <VideoWatchingScreen
                  currSideHeader={currSideHeader}
                  setCurrSideHeader={setCurrSideHeader}
                />
              }
              exact
            />
            <Route
              path="/"
              element={<HomeScreen currSideHeader={currSideHeader} />}
            >
              <Route
                path="/feed/subscriptions"
                element={<SubscriptionScreen />}
                exact
              />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
