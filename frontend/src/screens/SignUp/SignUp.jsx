import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { registerUser } from "../../redux/Actions/userActions";
// eslint-disable-next-line
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [name, setName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    // eslint-disable-next-line
    user,
    loading: userLoading,
    error,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bool = await dispatch(
        registerUser(name, channelName, avatar, email, password)
      );

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      //! 0 means initial
      //! 1 means processing
      //! 2 means processed
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  return (
    <div className="sup__cover">
      <div className="sup__wrapper">
        <div className="sup__left">
          <h1>Sign Up</h1>
          <p className="supw">
            <span></span> Sign up with
          </p>
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
            <div className="form__top">
              <Avatar
                src={avatar}
                className="avatar"
                alt="User"
                sx={{ height: "8vmax", width: "8vmax", marginBottom: "20px" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="form__bottom">
              <input
                type="text"
                className="registerInputs"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="registerInputs"
                placeholder="Channel Name"
                required
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />

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
            Already have an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span> Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
