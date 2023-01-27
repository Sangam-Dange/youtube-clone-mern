import React, { useEffect } from "react";
import { useState } from "react";
import { CgMaximize, CgMinimize, CgMiniPlayer } from "react-icons/cg";
import { MdSlowMotionVideo, MdSubtitles } from "react-icons/md";
import { TbRectangle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  IoPauseSharp,
  IoPlaySharp,
  IoPlaySkipForwardSharp,
  IoVolumeMediumSharp,
  IoVolumeMuteSharp,
} from "react-icons/io5";
import "./VideoPlayer.scss";
import { useRef } from "react";
import { CircularProgress } from "@mui/material";

const VideoPlayer = ({ toggleCinema, setToggleCinema, videoId, videoPost }) => {
  const [range, setRange] = useState(0.5);
  const [playPause, setPlayPause] = useState(false);
  const [toggleVolumeMute, setToggleVolumeMute] = useState(true);
  const [toggleSpeedDiv, setToggleSpeedDiv] = useState(false);
  const [toggleFullScreen, setToggleFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showControlsToggler, setShowControlsToggler] = useState(true);

  const [toggleDragging, setToggleDragging] = useState(false);
  const [currentHoveringDuration, setCurrentHoveringDuration] =
    useState("00:00");

  const [playSpeed, setPlaySpeed] = useState({ name: "Normal", value: "1" });
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [currentChangingTime, setCurrentChangingTime] = useState({
    start: "00:00",
    end: "00:00",
  });

  const mainVideo = useRef();
  const progressBar = useRef();
  const container = useRef();
  const canvas = useRef();
  const hoveringCurrTime = useRef();
  const videoTimeline = useRef();
  const navigate = useNavigate();

  //! streaming

  const allSpeeds = [
    {
      name: "0.25x",
      value: "0.25",
    },
    {
      name: "0.5x",
      value: "0.5",
    },
    {
      name: "0.75x",
      value: "0.75",
    },
    {
      name: "Normal",
      value: "1",
    },
    {
      name: "1.25x",
      value: "1.25",
    },
    {
      name: "1.50x",
      value: "1.5",
    },
    {
      name: "1.75x",
      value: "1.75",
    },
    {
      name: "2x",
      value: "2",
    },
  ];

  // setting the initial state of video player
  const handleVideoLoaded = (e) => {
    setIsLoading(false);
    let end = formatTime(e.target.duration).toString();
    setCurrentChangingTime({
      start: currentChangingTime.start,
      end,
    });
    setProgressBarWidth(0);
    e.target.volume = 0.5;
  };

  useEffect(() => {
    let timeOutID;
    if (!playPause) {
      timeOutID = setTimeout(() => {
        setShowControlsToggler(false);
      }, 3000);
    } else {
      setShowControlsToggler(true);
      clearTimeout(timeOutID);
    }
  }, [playPause, showControlsToggler]);

  const handlePlayPauseClick = () => {
    if (mainVideo.current.paused) {
      mainVideo.current.play();
      setPlayPause(false);
      setShowControlsToggler(true);
    } else {
      setPlayPause(true);
      setShowControlsToggler(true);
      mainVideo.current.pause();
    }
  };

  const formatTime = (time) => {
    //getting seconds, minutes,hours;
    let sec = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    // adding 0 at the beginning if the particular value is less than 10
    sec = sec < 10 ? `0${sec}` : sec;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours === "00") {
      return `${minutes}:${sec}`;
    }

    return `${hours}:${minutes}:${sec}`;
  };

  // handle buffered data
  const drawProgress = (buffered, duration) => {
    // I've turned off anti-aliasing since we're just drawing rectangles.
    var context = canvas.current.getContext("2d", { antialias: false });
    context.fillStyle = "rgba(255,255,255,0.6)";

    //
    var width = canvas.current.width;
    var height = canvas.current.height;

    // if (!width || !height) throw "Canvas's width or height weren't set!";
    context.clearRect(0, 0, width, height); // clear canvas

    for (var i = 0; i < buffered.length; i++) {
      var leadingEdge = Math.floor((buffered.start(i) / duration) * width);
      var trailingEdge = Math.floor((buffered.end(i) / duration) * width);

      context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height);
    }
  };

  const handleVideoBufferingProgress = () => {
    drawProgress(mainVideo.current.buffered, mainVideo.current.duration);
  };

  const handleTimeUpdate = (e) => {
    let { currentTime, duration } = e.target;

    setProgressBarWidth((currentTime / duration) * 100);
    if (currentTime === duration) {
      setPlayPause(true);
    }
    setCurrentChangingTime({
      start: formatTime(currentTime),
      end: formatTime(duration),
    });
  };

  const handleVolButtonClick = () => {
    if (toggleVolumeMute) {
      mainVideo.current.volume = 0;
      setRange(0);
      setToggleVolumeMute(false);
    } else {
      mainVideo.current.volume = 0.5;
      setRange(0.5);
      setToggleVolumeMute(true);
    }
  };

  const handleVolumeRange = (e) => {
    mainVideo.current.volume = e.target.value;
    setRange(e.target.value);
    if (e.target.value === "0") {
      setToggleVolumeMute(false);
    } else if (e.target.value > "0") {
      setToggleVolumeMute(true);
    }
  };
  const fn = (event) => {
    if (event.key === "ArrowLeft") {
      mainVideo.current.currentTime -= 5;
    } else if (event.key === "ArrowRight") {
      mainVideo.current.currentTime += 5;
    }
    // else if (event.code === "Space") {
    //   handlePlayPauseClick();
    // }
  };

  useEffect(() => {
    document.addEventListener("keydown", fn, true);
    return () => document.removeEventListener("keydown", fn, true);
  }, []);

  const handleSpeedOfVideo = (name, value) => {
    setPlaySpeed({ name });
    mainVideo.current.playbackRate = value;
    setToggleSpeedDiv(false);
  };

  const handleVideoMiniMiser = () => {
    mainVideo.current.requestPictureInPicture();
  };

  useEffect(() => {
    mainVideo?.current?.addEventListener(
      "enterpictureinpicture",
      () => {
        navigate("/");
      },
      false
    );
    mainVideo?.current?.addEventListener("leavepictureinpicture", () => {
      navigate(`/watch/${videoPost?._id}`);
    });
  }, [navigate, videoPost]);

  const handleFullScreen = () => {
    setToggleFullScreen(!toggleFullScreen);
    if (document.fullscreenElement) {
      return document.exitFullscreen();
    }
    container.current.requestFullscreen();
  };

  const handleVideoDurationProgressBar = (e) => {
    let timelineWidth = videoTimeline.current.clientWidth;

    mainVideo.current.currentTime =
      (e.nativeEvent.offsetX / timelineWidth) * mainVideo.current.duration;
  };

  const draggableProgressBar = (e) => {
    hoveringCurrTime.current.style.left = `${e.nativeEvent.offsetX}px`;

    let timelineWidth = videoTimeline.current.clientWidth;
    drawProgress(mainVideo.current.buffered, mainVideo.current.duration);
    if (toggleDragging) {
      progressBar.current.style.width = `${e.nativeEvent.offsetX}px`;
      mainVideo.current.currentTime =
        (e.nativeEvent.offsetX / timelineWidth) * mainVideo.current.duration;
      setCurrentChangingTime({
        start: formatTime(mainVideo.current.currentTime),
        end: currentChangingTime.end,
      });
    }
    let percentage =
      (e.nativeEvent.offsetX / timelineWidth) * mainVideo.current.duration;

    setCurrentHoveringDuration(
      percentage > 0 ? formatTime(percentage) : "00:00"
    );
  };

  const handleProgressBarDragEnd = (e) => {
    setToggleDragging(false);
  };

  return (
    <div
      className={
        toggleFullScreen
          ? `video__wrapper ${
              showControlsToggler ? "showControls" : " "
            }  fullscreen`
          : toggleCinema
          ? `video__wrapper ${
              showControlsToggler ? "showControls" : " "
            } cinemaMode`
          : `video__wrapper ${showControlsToggler ? "showControls" : " "}`
      }
      ref={container}
      onMouseMove={draggableProgressBar}
      onMouseUp={handleProgressBarDragEnd}
      onMouseLeave={() => setShowControlsToggler(false)}
      onMouseMoveCapture={() => {
        setShowControlsToggler(true);
      }}
    >
      {isLoading && (
        <div className="loading_wrapper">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div
        className="controller__wrapper"
        style={{ display: isLoading ? "none" : "" }}
      >
        <div
          className="video-timeline"
          ref={videoTimeline}
          onClick={handleVideoDurationProgressBar}
          onMouseDown={() => setToggleDragging(true)}
        >
          <div className="progress-area">
            <span ref={hoveringCurrTime}>{currentHoveringDuration}</span>

            <div
              className="progress-bar"
              ref={progressBar}
              style={{ width: `${progressBarWidth}%` }}
            ></div>

            <canvas
              id="canvas"
              width={"100%"}
              height="4px"
              ref={canvas}
            ></canvas>
          </div>
        </div>
        <ul className="video-controls">
          <li className="options left">
            {playPause ? (
              <button className="play-pause" onClick={handlePlayPauseClick}>
                <IoPlaySharp fontSize={"25px"} />
              </button>
            ) : (
              <button className="play-pause" onClick={handlePlayPauseClick}>
                <IoPauseSharp fontSize={"25px"} />
              </button>
            )}
            <button className="skip-next">
              <IoPlaySkipForwardSharp fontSize={"25px"} />
            </button>
            <div className="volume-button">
              <button>
                {toggleVolumeMute ? (
                  <IoVolumeMediumSharp
                    fontSize={"25px"}
                    onClick={handleVolButtonClick}
                  />
                ) : (
                  <IoVolumeMuteSharp
                    fontSize={"25px"}
                    onClick={handleVolButtonClick}
                  />
                )}
              </button>
              <input
                type="range"
                name="range"
                id="range"
                min={0}
                max={1}
                step="any"
                value={range}
                onChange={handleVolumeRange}
              />
              <div className="video-timer">
                <p className="current-time">{currentChangingTime.start}</p>
                <p className="separator"> / </p>
                <p className="video-duration">{currentChangingTime.end}</p>
              </div>
            </div>
          </li>
          <li className="options right">
            <button>
              <MdSubtitles fontSize={"25px"} />
            </button>
            <div className="playback-content">
              <button
                className="playback-speed"
                onClick={() => setToggleSpeedDiv(!toggleSpeedDiv)}
              >
                <MdSlowMotionVideo fontSize={"25px"} />
              </button>
              <ul
                className={
                  toggleSpeedDiv
                    ? "speed-options speed-options-toggle"
                    : "speed-options"
                }
              >
                {allSpeeds.map(({ name, value }, i) => {
                  return (
                    <li
                      className={playSpeed.name === name ? "active-speed" : " "}
                      onClick={() => handleSpeedOfVideo(name, value)}
                      key={i}
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button className="pic-in-pic">
              <CgMiniPlayer fontSize={"25px"} onClick={handleVideoMiniMiser} />
            </button>
            <button>
              <TbRectangle
                fontSize={"25px"}
                onClick={() => setToggleCinema(!toggleCinema)}
              />
            </button>
            <button className="fullscreenBtn" onClick={handleFullScreen}>
              {toggleFullScreen ? (
                <CgMinimize fontSize={"25px"} />
              ) : (
                <CgMaximize fontSize={"25px"} />
              )}
            </button>
          </li>
        </ul>
      </div>

      {videoId && (
        <video
          preload="auto"
          // autoPlay={"autoplay"}
          src={`/api/v1/videos/video/stream/${videoId}`}
          ref={mainVideo}
          onTimeUpdate={handleTimeUpdate}
          onDoubleClick={handleFullScreen}
          onClick={handlePlayPauseClick}
          onLoadedData={handleVideoLoaded}
          onProgress={handleVideoBufferingProgress}
          onLoadStart={() => setIsLoading(true)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          type="video/mp4"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
