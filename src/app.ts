import express, { NextFunction, Request, json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';

const { PORT = 3000 } = process.env;

const app = express();

app.use(json());
app.use(router);

connect();

async function connect() {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
  console.log(`App listening on port ${PORT}`)
}

function tmpMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user = {
    _id: '65dc6a614a6607670825b436'
  }

  next();
}