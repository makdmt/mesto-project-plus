import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { mongo } from 'mongoose';
import User, { IUser } from '../models/user';
import { ConflictError, NotFoundError } from '../middlewares/errors/custom-errors';

const USER_ALREADY_EXIST_ERR_MSG = 'user is already exist';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.find({ _id: id }).orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user: IUser) => res.send(user))
    .catch((err: unknown) => {
      if (err instanceof mongo.MongoError) {
        if (err.code === 11000) next(new ConflictError(USER_ALREADY_EXIST_ERR_MSG));
      }
      next(err);
    });
};

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(new NotFoundError())
    .then((user) => res.send({ user }))
    .catch(next);
};

export const patchUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(new NotFoundError())
    .then((user) => res.send({ user }))
    .catch(next);
};
