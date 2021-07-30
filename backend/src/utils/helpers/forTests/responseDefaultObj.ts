interface CookieConfig {
  sameSite: string;
  path: string;
  expires: Date;
  httpOnly: string;
}

const createCustomResponseObj = () => ({
  jsonObj: <any>{},
  statusCode: 0,
  cookieName: "",
  cookieToken: "",
  cookieConfig: { sameSite: "", path: "", expires: new Date(), httpOnly: "" },
  msg: "",
  status(code: number) {
    this.statusCode = code;
    return this;
  },
  cookie(name: string, token: string, config: CookieConfig) {
    this.cookieName = name;
    this.cookieToken = token;
    this.cookieConfig = config;
    return this;
  },
  send(msg: string) {
    this.msg = msg;
  },
  json(obj: any) {
    this.jsonObj = { ...obj };
  },
});

export default createCustomResponseObj;
