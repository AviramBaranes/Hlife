"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, enum: ['male', 'female'] },
    dateOfBirth: {
        type: Date,
        min: '01/01/1920',
        max: '01/01/2005',
        required: true,
    },
    grade: { type: Number, required: true, default: 0 },
    hasProgram: { type: Boolean, default: false },
    hasGoals: { type: Boolean, default: false },
    hasInitialStats: { type: Boolean, default: false },
    hasAllWorkouts: { type: Boolean, default: false },
    workouts: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Workout' }],
    resetToken: { type: String },
    tokenExpiration: { type: Date },
});
//TODO add goals
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
