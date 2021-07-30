"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDb() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
exports.default = connectDb;