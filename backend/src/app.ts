import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import fs from 'fs';
import path from 'path';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// import csrf from 'csurf';
import mongoSanitize from 'express-mongo-sanitize';
import RateLimiter from 'express-rate-limit';
import express, { Request, Response, NextFunction } from 'express';

import connectDb from './utils/database';
import { CustomError } from './types/error';
import authRoute from './routes/auth';
import statsRoute from './routes/stats';
import goalsRoute from './routes/goals';
import workoutRoute from './routes/workout';
import programRoute from './routes/program';
import programExecRoute from './routes/programExecution';

declare global {
  namespace Express {
    interface Request {
      userId: any;
    }
  }
}

// const csrfProtection =
//   process.env.NODE_ENV === 'test'
//     ? csrf({
//         cookie: true,
//         ignoreMethods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
//       })
//     : csrf({
//         cookie: {
//           httpOnly: true,
//           sameSite: 'none',
//           secure: true,
//           domain: '.herokuapp.com',
//         },
//       });
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const app = express();

connectDb();

const limiter = new (RateLimiter as any)({
  max: 100,
  windowMs: 15 * 60 * 1000,
});

app.set('trust proxy', 1);

app.disable('x-powered-by');

app.use(cors({ credentials: true, origin: clientOrigin }));

app.use(cookieParser());

app.use(helmet()); //a collection of middleware functions that improve the security of HTTP headers

app.use(express.json());

const publicDirPath = path.join(__dirname, 'public');
const imagesDirPath = path.join(__dirname, 'public/images');

if (!fs.existsSync(publicDirPath)) {
  fs.mkdirSync(publicDirPath);
}
if (!fs.existsSync(imagesDirPath)) {
  fs.mkdirSync(imagesDirPath);
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(hpp()); //HPP puts array parameters in req.query and/or req.body aside and just selects the last parameter value.

app.use(
  mongoSanitize({
    replaceWith: '_',
  })
); //Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

app.use(limiter); // Protect the system against brute force

// app.get('/', csrfProtection, function (req: Request, res: Response) {
//   res.cookie('XSRF-TOKEN', req.csrfToken(), {
//     sameSite: 'none',
//     secure: true,
//     domain: '.herokuapp.com',
//   });
//   res.end();
// });

// app.use(csrfProtection);

app.use('/auth', authRoute);

app.use('/goals', goalsRoute);

app.use('/stats', statsRoute);

app.use('/workout', workoutRoute);

app.use('/program', programRoute);

app.use('/program-exec', programExecRoute);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    process.env.NODE_ENV !== 'test' && console.log(error);
    let { statusCode, message, data } = error;
    if (!statusCode) statusCode = 500;
    if (!message) message = 'Server Error';
    if (!data) data = null;

    res.status(statusCode).send({ message, data });
  }
);

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () =>
  console.log(`Hlife listening on port ${PORT}`)
);
export default server; //for tests
