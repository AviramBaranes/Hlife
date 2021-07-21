import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PhysicalStatsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  age: { type: Number, required: true, min: 16, max: 100 },

  stats: [
    {
      date: { type: Date, required: true },

      weight: { type: Number, min: 35, max: 250 },

      height: { type: Number, min: 100, max: 250 },

      fatPercentage: { type: Number, min: 0, max: 80 },

      muscelesMass: { type: Number, min: 10, max: 200 },
    },
  ],
});

const PhysicalStats = mongoose.model("PhysicalStats", PhysicalStatsSchema);
export default PhysicalStats;
