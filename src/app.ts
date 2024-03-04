import express, {
  NextFunction, Request, Response, json,
} from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import errHandleMiddleware from './middlewares/errors/errors-middleware';
import 'dotenv/config';

const { EXPRESS_SERVER_PORT: PORT = 3000, MONGO_URL = '' } = process.env;

const app = express();

async function connect() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URL);
  app.listen(PORT);
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
}

function fakeAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user = { _id: '65e35009acbdd707fc26e6d7' };
  next();
}

app.use(json());
app.use(fakeAuthMiddleware);
app.use(router);
app.use(errHandleMiddleware);

connect();
