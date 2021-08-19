"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnums = void 0;
const validateEnums = (value, enumList) => {
    let isValid = false;
    enumList.forEach((item) => {
        if (value === item) {
            isValid = true;
            return;
        }
    });
    if (isValid) {
        return true;
    }
    throw new Error("Invalid value");
};
exports.validateEnums = validateEnums;
