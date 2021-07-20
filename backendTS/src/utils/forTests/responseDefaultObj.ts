const createCustomResponseObj = () => ({
  jsonObj: {},
  statusCode: 0,
  cookieName: "",
  cookieToken: "",
  cookieConfig: {},
  msg: "",
  status(code: number) {
    this.statusCode = code;
    return this;
  },
  cookie(name: string, token: string, config: object) {
    this.cookieName = name;
    this.cookieToken = token;
    this.cookieConfig = config;
    return this;
  },
  send(msg: string) {
    this.msg = msg;
  },
  json(obj: object) {
    this.jsonObj = obj;
  },
});

export default createCustomResponseObj;
