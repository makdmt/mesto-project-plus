import express, { NextFunction, Request, json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import { STATUS_CODES } from './helpers/constants';
import fs from 'fs'

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

const sc: Record<string | number, {statusCode: string, message: string}> = {};
for (let key in STATUS_CODES) {
  const msg = STATUS_CODES[key as keyof typeof STATUS_CODES];
  const codeKey = msg.replace(/[\s-]/g, '_').toUpperCase();

  // sc[STATUS_CODES[key as keyof typeof STATUS_CODES]] = key;
  sc[codeKey] = {
    statusCode: key,
    message: msg
  };
}

fs.writeFile('const.ts', JSON.stringify(sc, null, '\t'), console.log)
