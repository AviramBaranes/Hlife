"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const csurf_1 = __importDefault(require("csurf"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./utils/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const stats_1 = __importDefault(require("./routes/stats"));
const goals_1 = __importDefault(require("./routes/goals"));
const workout_1 = __importDefault(require("./routes/workout"));
const program_1 = __importDefault(require("./routes/program"));
const programExecution_1 = __importDefault(require("./routes/programExecution"));
const csrfProtection = process.env.NODE_ENV === "test"
    ? csurf_1.default({
        cookie: true,
        ignoreMethods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
    })
    : csurf_1.default({ cookie: true });
const app = express_1.default();
database_1.default();
const limiter = new express_rate_limit_1.default({
    max: 100,
    windowMs: 15 * 60 * 1000,
});
app.disable("x-powered-by");
app.use(cors_1.default({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookie_parser_1.default());
app.use(helmet_1.default()); //a collection of middleware functions that improve the security of HTTP headers
app.use(express_1.default.json());
app.use(hpp_1.default()); //HPP puts array parameters in req.query and/or req.body aside and just selects the last parameter value.
app.use(express_mongo_sanitize_1.default({
    replaceWith: "_",
})); //Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(limiter); // Protect the system against brute force
app.get("/", csrfProtection, function (req, res) {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.send("SET");
});
app.use(csrfProtection); //in frontend in the requests body put the token under _csrf
app.use("/auth", auth_1.default);
app.use("/goals", goals_1.default);
app.use("/stats", stats_1.default);
app.use("/workout", workout_1.default);
app.use("/program", program_1.default);
app.use("/program-exec", programExecution_1.default);
app.use((error, req, res, next) => {
    let { statusCode, message, data } = error;
    if (!statusCode)
        statusCode = 500;
    if (!message)
        message = "Server Error";
    if (!data)
        data = null;
    res.status(statusCode).json({ message, data });
});
const server = app.listen(8080);
exports.default = server; //for tests
