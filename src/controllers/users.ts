import { Request, Response } from 'express';
import User from '../models/user';
import { STATUS_CODES } from '../errors/status-codes';

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then(user => res.send(user))
    .catch(err => res.status(404).send(err))
}

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  return User.find({ id }).orFail(new Error('пользователь не найден'))

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

export const patchUser = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then(user => res.send({ user }))
    .catch(err => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode).send({ message: STATUS_CODES.INTERNAL_SERVER_ERROR.message }))
}

export const patchUserAvatar = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then(user => res.send({ user }))
    .catch(err => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode).send({ message: STATUS_CODES.INTERNAL_SERVER_ERROR.message }))
}