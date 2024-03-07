import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { errors as celebraleErrorHandler } from 'celebrate';
import mongoose from 'mongoose';
import router from './routes/index';
import errHandleMiddleware from './middlewares/errors/errors-middleware';
import 'dotenv/config';
import { errorLogger, requestLogger } from './middlewares/logger';

const { EXPRESS_SERVER_PORT: PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

async function connect() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URL);
  app.listen(PORT);
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
}

app.use(json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(celebraleErrorHandler());
app.use(errHandleMiddleware);

connect();
