import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/Actions/userActions";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./LoginScreen.scss";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loading: userLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bool = await dispatch(loginUser(email, password));
      if (bool) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      Toastify({
        text: error,
        className: "error",
        close: true,
        style: {
          background: `linear-gradient(to right, red,  black)`,
          boxShadow: "none",
        },
      }).showToast();
      dispatch({ type: "clearErrors" });
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <div className="sin__cover">
      <div className="sin__wrapper">
        <div className="sin__left">
          <h1>Sign In</h1>
          <p className="sinw">Sign in with</p>
          <div className="custom_auth">
            <button>
              <img
                src={require("../../assets/icons8-google-48.png")}
                alt="google"
              />
              Google
            </button>
            <button>
              <img
                src={require("../../assets/icons8-facebook-48.png")}
                alt="facebook"
              />
              Facebook
            </button>
          </div>
          <p className="or">or</p>
          <form onSubmit={handleSubmit} method="post">
            <div className="form__bottom">
              <input
                type="email"
                className="registerInputs"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ width: "100%" }} className="pass__div">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="registerInputs"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%" }}
                />
                {isPasswordVisible ? (
                  <AiOutlineEye
                    className="eye__icon"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="eye__icon"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
              </div>
            </div>
            <Button type="submit" disabled={userLoading}>
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ fontSize: "20px" }}
              />
            </Button>
          </form>

          <p className="have__acc">
            New User?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span> Sign Up</span>
            </Link>
          </p>
        </div>
        {/* <div className="sin__right">
          <img src={require("../../assets/sinBG.jpeg")} alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default LoginScreen;
