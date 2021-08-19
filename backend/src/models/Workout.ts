import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  trainingDayName: {
    type: String,
    enum: ["A", "B", "C", "D", "FB", "aerobic"],
    required: true,
  },

  name: { type: String, required: true },

  description: { type: String },

  exercises: [
    {
      muscles: [{ type: String }],
      name: { type: String, required: true },
      description: { type: String },
      sets: { type: Number, required: true, min: 1, max: 7 },
      reps: { type: Number, required: true, min: 1, max: 50 },
    },
  ],

  time: { type: Number, min: 10, max: 300 },
});

const Program = mongoose.model("Workout", WorkoutSchema);
export default Program;
