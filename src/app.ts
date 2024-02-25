import express, { json, Router } from 'express';
import mongoose from 'mongoose';
import { createUser } from './controllers/users';

const {PORT = 3000} = process.env;


const app = express();
app.use(json());

const router = Router();

app.use(router);


app.get('/users', (req, res) => {console.log('users');
res.send({message: 'yes'})})
app.post('/users', createUser);

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
  console.log(`App listening on port ${PORT}`)
}

connect();


