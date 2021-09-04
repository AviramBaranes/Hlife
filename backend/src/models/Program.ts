import mongoose, { Document, ObjectId } from "mongoose";

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

export interface ProgramObj {
  _id: ObjectId;
  day:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  restDay: boolean | undefined;
  workout: ObjectId | undefined;
}

export interface ProgramType extends Document {
  user: ObjectId;
  program: ProgramObj[];
}
