const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },

  username: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, select: false },

  gender: { type: String, enum: ["male", "female"] },

  dateOfBirth: {
    type: Date,
    min: "01/01/1920",
    max: "01/01/2005",
    required: true,
  },

  grade: { type: Number, required: true, default: 0 },

  hasProgram: { type: Boolean, default: false },

  hasDiet: { type: Boolean, default: false },

  resetToken: { type: String },

  tokenExpiration: { type: Date },
});

//TODO add goals

module.exports = mongoose.model("User", UserSchema);
