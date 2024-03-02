import express, { NextFunction, Request, Response, json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import { errHandleMiddleware } from './middlewares/errors/errors-middleware';

const { PORT = 3000 } = process.env;

const app = express();

app.use(json());
app.use(fakeAuthMiddleware);
app.use(router);
app.use(errHandleMiddleware);

connect();

async function connect() {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
  console.log(`App listening on port ${PORT}`)
}

function fakeAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user = { _id: '65e35009acbdd707fc26e6d7' }
  next();
}