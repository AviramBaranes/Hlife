"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDb() {
    const uri = process.env.MONGO_URI ||
        'mongodb+srv://Aviram2001:zn300j@cluster0.puixu.mongodb.net/Hlife?retryWrites=true&w=majority';
    try {
        await mongoose_1.default.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('MongoDB connected');
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
exports.default = connectDb;
