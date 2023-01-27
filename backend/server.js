const app = require("./app");
const cloudinary = require("cloudinary");
const db = require("./config/DB.js");

//? env variables
const dotEnv = require("dotenv");
dotEnv.config();
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const startServer = async () => {
  try {
    const connected = await db();
    if (connected) {
      app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
      });
    }
  } catch (error) { 
    console.log(error);  
  }
}; 

startServer();
  