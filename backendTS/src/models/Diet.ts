import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DietSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  descreption: { type: String },

  cheatsPerMonth: { type: Number, default: 0, min: 0, max: 31 },

  ingredients: [
    {
      name: { type: String, required: true },

      amount: { type: Number, required: true },

      calories: { type: Number },

      fat: { type: Number },

      protein: { type: Number },

      carbohydrate: { type: Number },

      dietaryFibre: { type: Number },
    },
  ],

  totalCalories: { type: Number },

  totalFat: { type: Number },

  totalProtein: { type: Number },

  totalCarbohydrate: { type: Number },

  totalDietaryFibres: { type: Number },

  allowOverCalories: { type: Boolean },

  allowOverFat: { type: Boolean },

  allowOverProtein: { type: Boolean },

  allowOverCarbohydrate: { type: Boolean },

  allowOverDietaryFibres: { type: Boolean },
});

const Diet = mongoose.model("Diet", DietSchema);

export default Diet;
