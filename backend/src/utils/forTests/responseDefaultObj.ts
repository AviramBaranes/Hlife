interface CookieConfig {
  sameSite: string;
  path: string;
  expires: Date;
  httpOnly: string;
}

interface JsonObj {
  message: string;
  username: string;
  userId: string;
  hasProgram: boolean;
  hasDiet: boolean;
  isAuthenticated: boolean;
}

const createCustomResponseObj = () => ({
  jsonObj: {
    message: "",
    username: "",
    userId: "",
    hasProgram: false,
    hasDiet: false,
    isAuthenticated: false,
  },
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
  json(obj: JsonObj) {
    this.jsonObj = obj;
  },
});

export default createCustomResponseObj;
