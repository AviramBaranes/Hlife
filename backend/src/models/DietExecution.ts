import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DietExecutionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  diet: { type: Schema.Types.ObjectId, ref: "Diet", required: true },

  executions: [
    {
      date: { type: Date, required: true },

      isCheatDay: { type: Boolean, required: true },

      caloriesConsumption: { type: Number },

      fatsConsumption: { type: Number },

      proteinsConsumption: { type: Number },

      carbohydratesConsumption: { type: Number },

      dietaryFibresConsumption: { type: Number },

      successRate: { type: Number, required: true, min: 0, max: 100 },

      grade: { type: Number, required: true, min: 0, max: 10 },
    },
  ],
});

const DietExecution = mongoose.model("DietExecution", DietExecutionSchema);
export default DietExecution;
