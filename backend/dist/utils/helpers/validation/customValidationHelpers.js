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
    return isValid;
};
exports.validateEnums = validateEnums;
