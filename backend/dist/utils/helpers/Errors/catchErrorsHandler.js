"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrorHandler = void 0;
const catchErrorHandler = (err, next) => {
    process.env.Node_ENV !== "test" && console.log(err);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
    return err;
};
exports.catchErrorHandler = catchErrorHandler;
