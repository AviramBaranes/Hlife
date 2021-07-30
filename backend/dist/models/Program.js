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
                    "Regular",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
            },
            rest: { type: Boolean, required: true },
            name: { type: String, requried: true },
            description: { type: String },
            aerobic: { type: Boolean, required: true },
            muscles: [
                {
                    muscle: {
                        type: String,
                        enum: [
                            "Traps",
                            "Shoulders",
                            "Chest",
                            "Upper back",
                            "Lats",
                            "Lower back",
                            "Triceps",
                            "Biceps",
                            "Forearm",
                            "Abs",
                            "Gluteus",
                            "Quads",
                            "Hamstrings",
                            "Claves", //תאומים
                        ],
                    },
                },
            ],
            time: { type: Number, min: 10, max: 300 },
        },
    ],
});
const Program = mongoose_1.default.model("Program", ProgramSchema);
exports.default = Program;
