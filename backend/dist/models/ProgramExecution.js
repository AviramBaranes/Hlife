"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProgramExecutionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    executions: [
        {
            workoutId: {
                type: Schema.Types.ObjectId,
                ref: 'Workout',
            },
            date: { type: Date, required: true },
            executionRate: { type: Number, required: true, min: 0, max: 100 },
            grade: { type: Number, required: true, default: 0, min: 0, max: 10 },
        },
    ],
});
const ProgramExecution = mongoose_1.default.model('ProgramExecution', ProgramExecutionSchema);
exports.default = ProgramExecution;
