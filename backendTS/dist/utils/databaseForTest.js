"use strict";
const mongoose = require("mongoose");
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI_FOR_TEST);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
async function disconnectDb() {
    try {
        await mongoose.disconnect();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = { connectDb, disconnectDb };
