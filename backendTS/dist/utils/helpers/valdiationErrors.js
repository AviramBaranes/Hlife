"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = __importDefault(require("express-validator"));
const validationErrorsHandler = (req) => {
    const errors = express_validator_1.default.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
};
exports.default = validationErrorsHandler;
