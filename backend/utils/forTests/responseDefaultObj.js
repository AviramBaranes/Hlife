module.exports = res = {
  statusCode: null,
  cookieName: null,
  cookieToken: null,
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
};
