import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GoalsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  basicGoal: {
    type: String,
    enum: ["lose weight", "gain weight"],
    required: true,
  },

  detailGoals: {
    weight: { type: Number, required: true },

    fatPercentage: { type: Number },

    muscelesMass: { type: Number },

    date: { type: Date },
  },
});

const Goals = mongoose.model("Goals", GoalsSchema);
export default Goals;
