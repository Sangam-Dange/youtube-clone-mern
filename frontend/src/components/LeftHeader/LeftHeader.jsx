import React from "react";
import { AiFillHome } from "react-icons/ai";
import {
  MdVideoLibrary,
  MdOutlineVideoLibrary,
  MdSubscriptions,
  MdOutlineSubscriptions,
} from "react-icons/md";

import { Link } from "react-router-dom";
import "./LeftHeader.scss";

const LeftMiniHeader = () => {
  return (
    <div className="lh__wrapper">
      <div className="navigations">
        <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
          <div className="home nav__button">
            <AiFillHome fontSize={"23px"} />
            <p>Home</p>
          </div>
        </Link>

        <Link
          to={"/feed/subscriptions"}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <div className="Sub nav__button">
            <MdOutlineSubscriptions fontSize={"23px"} />
            <p>Subscriptions</p>
          </div>
        </Link>

        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="library nav__button">
            <MdOutlineVideoLibrary fontSize={"23px"} />
            <p>Library</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftMiniHeader;
