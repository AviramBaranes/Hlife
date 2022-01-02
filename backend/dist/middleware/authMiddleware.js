"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler = (errorMsg) => {
    const error = new Error(errorMsg);
    error.statusCode = 401;
    throw error;
};
const authMiddleware = (req, _, next) => {
    var _a;
    try {
        let authToken;
        try {
            authToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1];
            if (!authToken)
                throw 'no token';
        }
        catch (err) {
            errorHandler("Unauthorized Couldn't find authorization header");
        }
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        }
        catch (err) {
            errorHandler('Unauthorized authorization header is invalid');
        }
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};
exports.default = authMiddleware;
