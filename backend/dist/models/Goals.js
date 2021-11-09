"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const GoalsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    basicGoal: {
        type: String,
        enum: ['lose fat', 'increase muscles mass'],
        required: true,
    },
    detailGoals: {
        weight: { type: Number, required: true },
        fatPercentage: { type: Number },
        musclesMass: { type: Number },
    },
});
const Goals = mongoose_1.default.model('Goals', GoalsSchema);
exports.default = Goals;
