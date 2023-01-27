import { Avatar, Box, Button, Divider, Modal } from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import {
  MdDashboard,
  MdFileUpload,
  MdOutlineAnalytics,
  MdOutlineInsertComment,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { useSelector } from "react-redux";

import VideoTable from "../../components/StudioScreen/VideoTable";
import "./StudioScreen.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "#282828",
  borderRadius: "5px",
  boxShadow: 24,
  // p: 4,
};

const StudioScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [currentTab, setCurrentTab] = useState("Dashboard");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filePick = useRef();
  const handleTabClick = (val) => {
    setCurrentTab(val);
  };

  const openVideoUploader = (e) => {
    filePick.current.click();
  };
  const handleVideoUpload = (e) => {};
  return (
    <div className="studio__wrapper">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal__container">
          <div className="modal__header">
            <h3>Upload Videos</h3>

            <IoCloseOutline
              size={"27px"}
              color="grey"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Divider />

          <div className="modal__body">
            <div className="upload__icon__div" onClick={openVideoUploader}>
              <MdFileUpload className="upload__icon" />
            </div>
            <input
              name="file"
              type="file"
              accept="video/mp4"
              onChange={handleVideoUpload}
              ref={filePick}
              style={{ visibility: "hidden" }}
            />
            <p>Drag and drop files to upload</p>
            <span>Your videos will be private until you publish them</span>

            <Button onClick={openVideoUploader}>Select files</Button>
          </div>
        </Box>
      </Modal>
      <div className="st__left">
        <div className="st__left__top">
          <Avatar
            src={user?.avatar?.url}
            className="avatar"
            alt="User"
            sx={{ height: "8vmax", width: "8vmax" }}
          />

          <h4>Your channel</h4>
          <p>{user?.name}</p>
        </div>

        <div
          className={`st__navTabs ${
            currentTab === "Dashboard" ? "st__navTabs__active" : ""
          } `}
          onClick={() => handleTabClick("Dashboard")}
        >
          <MdDashboard size={"24px"} className="st__icon" />
          <p>Dashboard</p>
          {currentTab === "Dashboard" && <span></span>}
        </div>
        <div
          className={`st__navTabs ${
            currentTab === "Content" ? "st__navTabs__active" : ""
          } `}
          onClick={() => handleTabClick("Content")}
        >
          <MdOutlineVideoLibrary size={"24px"} className="st__icon" />
          <p>Content</p>
          {currentTab === "Content" && <span></span>}
        </div>
        <div
          className={`st__navTabs ${
            currentTab === "Analytics" ? "st__navTabs__active" : ""
          } `}
          onClick={() => handleTabClick("Analytics")}
        >
          <MdOutlineAnalytics size={"24px"} className="st__icon" />
          <p>Analytics</p>
          {currentTab === "Analytics" && <span></span>}
        </div>
        <div
          className={`st__navTabs ${
            currentTab === "Comments" ? "st__navTabs__active" : ""
          } `}
          onClick={() => handleTabClick("Comments")}
        >
          <MdOutlineInsertComment size={"24px"} className="st__icon" />
          <p>Comments</p>
          {currentTab === "Comments" && <span></span>}
        </div>
      </div>

      <div className="st__right">
        <div className="studio__header">
          <h2>Channel content</h2>

          <Button onClick={handleOpen}>
            <AiOutlineVideoCameraAdd className="videoAdd__icon" />
            Upload Videos
          </Button>
        </div>

        <VideoTable />
      </div>
    </div>
  );
};

export default StudioScreen;
