import React from "react";
import { AiFillHome, AiOutlineBulb, AiOutlineHistory } from "react-icons/ai";
import { HiOutlineFire } from "react-icons/hi";
import { TfiCup, TfiVideoClapper } from "react-icons/tfi";
import {
  MdOutlineAccessTime,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { RiVideoLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./ExtendedHeader.scss";

import { IoMusicalNotesOutline } from "react-icons/io5";
import { BsBroadcast, BsNewspaper } from "react-icons/bs";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useSelector } from "react-redux";

const ExtendedHeader = ({ overhead, toggle, setToggle }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`eh__wrapper 
        ${
          overhead && (toggle ? "header-translate-x-s" : "header-translate-x-h")
        }`}
    >
      <div className="eh__innerDiv">
        <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
          <div className="home nav__button_ex">
            <AiFillHome fontSize={"23px"} />
            <p>Home</p>
          </div>
        </Link>

        <Link
          to={"/feed/subscriptions"}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <div className="Sub nav__button_ex">
            <MdOutlineSubscriptions fontSize={"23px"} />
            <p>Subscriptions</p>
          </div>
        </Link>
      </div>
      <div className="eh__innerDiv">
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="library nav__button_ex">
            <MdOutlineVideoLibrary fontSize={"23px"} />
            <p>Library</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <AiOutlineHistory fontSize={"23px"} color="#fff" />
            <p>History</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <RiVideoLine fontSize={"23px"} />
            <p>Your Videos</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <MdOutlineAccessTime fontSize={"23px"} color="#fff" />
            <p>Watch Later</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <BiLike fontSize={"23px"} />
            <p>Liked Videos</p>
          </div>
        </Link>
      </div>
      <div className="eh__innerDiv">
        <h4 className="eh__innerDiv__headings">SUBSCRIPTIONS</h4>
        {user?.subscribed?.map((sc, index) => {
          return (
            <ProfileCard
              key={sc._id}
              avHeight={"1.5vmax"}
              avWidth={"1.5vmax"}
              avUrl={sc?.avatar?.url}
              extended={false}
              classStyle={"hover__profile__container"}
              videoOwner={sc}
            />
          );
        })}
      </div>
      <div className="eh__innerDiv">
        <h4 className="eh__innerDiv__headings">EXPLORE</h4>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="library nav__button_ex">
            <HiOutlineFire fontSize={"23px"} />
            <p>Trending</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <IoMusicalNotesOutline fontSize={"23px"} color="#fff" />
            <p>Music</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <TfiVideoClapper fontSize={"23px"} />
            <p>Films</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <BsBroadcast fontSize={"23px"} color="#fff" />
            <p>Live</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <BsNewspaper fontSize={"23px"} />
            <p>News</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <TfiCup fontSize={"23px"} />
            <p>Sports</p>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "#fff" }}>
          <div className="nav__button_ex">
            <AiOutlineBulb fontSize={"23px"} />
            <p>Learning</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExtendedHeader;
