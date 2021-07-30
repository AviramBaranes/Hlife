"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
            successRate: { type: Number, reqiured: true, min: 0, max: 100 },
            grade: { type: Number, required: true, min: 0, max: 10 },
        },
    ],
});
const DietExecution = mongoose_1.default.model("DietExecution", DietExecutionSchema);
exports.default = DietExecution;
