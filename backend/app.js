const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

//? cookie parsing middleware
const cookieParser = require("cookie-parser");

//? for making cross origin request
const cors = require("cors");
 
//? middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
mongoose.set('strictQuery', true) 
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(__dirname));
// console.log(path.join(__dirname, "../uploads"))
//? cookie parsing middleware
app.use(cookieParser());  

app.use( 
  cors({
    credentials: true,
    origin: `http://localhost:3000`,
  })
);

//? importing routes
const userRoutes = require("./routes/userRoutes.js");
const videoRoutes = require("./routes/videoRoutes.js");
// const { default: mongoose, mongo } = require("mongoose");
// const VideoModel = require("./models/VideoModel.js");

//? using routes
app.use("/api/v1/users", userRoutes); 
app.use("/api/v1/videos", videoRoutes);



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

module.exports = app;
 