"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProgramSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    program: [
        {
            day: {
                type: String,
                required: true,
                enum: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
            },
            restDay: { type: Boolean },
            workout: { type: Schema.Types.ObjectId, ref: "Workout" },
        },
    ],
});
const Program = mongoose_1.default.model("Program", ProgramSchema);
exports.default = Program;
