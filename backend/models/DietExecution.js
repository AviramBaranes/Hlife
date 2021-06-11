const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DietExecutionSchema = {
  user: { type: Schema.Types.ObjectId, ref: "User" },

  diet: { type: Schema.Types.ObjectId, ref: "Diet" },

  executions: [
    {
      date: { type: Date, required: true },

      isCheatDay: { type: Boolean, required: true },

      caloriesConsumption: { type: Number },

      fatsConsumption: { type: Number },

      proteinsConsumption: { type: Number },

      carbohydratesConsumption: { type: Number },

      dietaryFibresConsumption: { type: Number },

      successRate: { type: Number, reqiured: true, min: 0, max: 100 },

      grade: { type: Number, required: true, min: 0, max: 10 },
    },
  ],
};

module.exports = mongoose.model("DietExecution", DietExecutionSchema);
