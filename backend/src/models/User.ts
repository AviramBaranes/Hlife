import mongoose, { Document, ObjectId } from "mongoose";

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

  hasGoals: { type: Boolean, default: false },

  hasInitialStats: { type: Boolean, default: false },

  hasAllWorkouts: { type: Boolean, default: false },

  workouts: [
    {
      trainingDayName: {
        type: String,
        enum: ["A", "B", "C", "D", "FB", "aerobic"],
        required: true,
      },
      name: { type: String, required: true },
    },
  ],

  resetToken: { type: String },

  tokenExpiration: { type: Date },
});

//TODO add goals

const User = mongoose.model("User", UserSchema);
export default User;

interface Workout {
  trainingDayName: "A" | "B" | "C" | "D" | "FB" | "aerobic";
  name: string;
}

export interface UserType extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: "male" | "female";
  dateOfBirth: Date;
  grade: number;
  hasProgram: boolean;
  hasAllWorkouts: boolean;
  hasGoals: boolean;
  hasInitialStats: boolean;
  workouts: Workout[] | undefined;
  resetToken: string | undefined;
  tokenExpiration: Date | undefined;
}
