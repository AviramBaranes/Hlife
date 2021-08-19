import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  program: [
    {
      day: {
        type: String,
        required: true,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },

      restDay: { type: Boolean },

      workout: { type: Schema.Types.ObjectId, ref: "Workout" },
    },
  ],
});

const Program = mongoose.model("Program", ProgramSchema);
export default Program;
