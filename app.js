import express from 'express';
const app = express();
import morgan from 'morgan'; //logger
import helmet from 'helmet'; //add header to request
import  mongoSanitize from 'express-mongo-sanitize'; //to remove the sql injection attack
import rateLimit from 'express-rate-limit'; //limit the request
import appError from './utilities/appError.js';
import userRouter from './routes/userRoutes.js';
import cinemaRouter from './routes/movieRoutes.js';
import globalErrorHandler from './controllers/errorController.js';

//NOTE - middleware

//Security HTTP headers
app.use(helmet());

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
// app.use(xss());

//Development logging configuration
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

//Testting middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

//Setting up the maximum request to server to do action
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100, // means 1 hour
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

//3. ROUTES
app.use('/v1/users', userRouter);
app.use('/v1/cinemas', cinemaRouter);

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;

