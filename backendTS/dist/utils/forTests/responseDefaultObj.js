"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCustomResponseObj = () => ({
    jsonObj: {},
    statusCode: 0,
    cookieName: "",
    cookieToken: "",
    cookieConfig: {},
    msg: "",
    status(code) {
        this.statusCode = code;
        return this;
    },
    cookie(name, token, config) {
        this.cookieName = name;
        this.cookieToken = token;
        this.cookieConfig = config;
        return this;
    },
    send(msg) {
        this.msg = msg;
    },
    json(obj) {
        this.jsonObj = obj;
    },
});
exports.default = createCustomResponseObj;
