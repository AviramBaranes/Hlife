const mongoose = require("mongoose");

async function connectDb(testUri) {
  try {
    await mongoose.connect(testUri || process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDb;
