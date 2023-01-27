const mongoose = require("mongoose");

const db = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected : ${connected.connection.host}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = db;
