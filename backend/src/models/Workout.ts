import mongoose, { Document, ObjectId } from "mongoose";

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

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;

interface Exercises {
  muscles: string[] | undefined;
  name: string;
  description: string | undefined;
  sets: number;
  reps: number;
}

export interface WorkoutType extends Document {
  user: ObjectId;
  trainingDayName: "A" | "B" | "C" | "D" | "FB" | "aerobic";
  name: string;
  description: string | undefined;
  exercises: Exercises[];
  time: number;
}
