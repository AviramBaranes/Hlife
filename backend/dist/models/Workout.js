"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
const Workout = mongoose_1.default.model("workout", WorkoutSchema);
exports.default = Workout;
