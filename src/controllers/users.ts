import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => {
 return User.find({})
.then(user => res.send(user))
.catch(err => res.status(404).send(err))
}

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  return User.find({id}).orFail(new Error('пользователь не найден'))

.then(user => res.send(user))
.catch(err => res.status(404).send(err))
}

export const createUser = (req: Request, res: Response) => {
  User.create({
 name: req.body.name,
 about: req.body.about,
 avatar: req.body.avatar
})
.then(user => res.send(user))
.catch(err => res.status(400).send(err))
}