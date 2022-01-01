"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
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
        }
        catch (err) {
            errorHandler("Unauthorized Couldn't find cookie");
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        }
        catch (err) {
            errorHandler('Unauthorized cookie is invalid');
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
