"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorsHandler = void 0;
const express_validator_1 = require("express-validator");
const validationErrorsHandler = (req) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
};
exports.validationErrorsHandler = validationErrorsHandler;
