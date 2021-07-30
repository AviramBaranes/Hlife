"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DietSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
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
const Diet = mongoose_1.default.model("Diet", DietSchema);
exports.default = Diet;
