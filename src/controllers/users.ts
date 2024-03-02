import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { NotFoundError } from '../errors/errors';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then(user => res.send(user))
    .catch(next)
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.find({ _id: id }).orFail(new NotFoundError())
    .then(user => res.send(user))
    .catch(next);
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  return User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar
  })
    .then(user => res.send(user))
    .catch(next);
}

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true }).orFail(new NotFoundError())
    .then(user => res.send({ user }))
    .catch(next)
}

export const patchUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true }).orFail(new NotFoundError())
    .then(user => res.send({ user }))
    .catch(next)
}