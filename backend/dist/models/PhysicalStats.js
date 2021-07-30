"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PhysicalStatsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number, required: true, min: 16, max: 100 },
    stats: [
        {
            date: { type: Date, required: true },
            weight: { type: Number, min: 35, max: 250, required: true },
            height: { type: Number, min: 100, max: 250 },
            fatPercentage: { type: Number, min: 0, max: 80 },
            muscelesMass: { type: Number, min: 10, max: 200 },
            bodyImageUrl: { type: String },
            deservedGrade: { type: Number, required: true, min: 15, max: 45 },
        },
    ],
});
const PhysicalStats = mongoose_1.default.model("PhysicalStats", PhysicalStatsSchema);
exports.default = PhysicalStats;
