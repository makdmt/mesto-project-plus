import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  console.log(req.body)
  User.create({
 name: req.body.name,
 about: req.body.about,
 avatar: req.body.avatar
})
.then(user => res.send(user))
.catch(err => res.status(400).send(err))
}