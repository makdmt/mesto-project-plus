import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { AuthorizationError, ConflictError, NotFoundError } from '../middlewares/errors/custom-errors';

const USER_ALREADY_EXIST_ERR_MSG = 'user is already exist';
const LOGIN_FAILED_ERR_MSG = 'wrong email or password';
export const { JWT_SECRET = 'dev-mode' } = process.env;

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

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password').orFail(new AuthorizationError(LOGIN_FAILED_ERR_MSG))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) return Promise.reject(new AuthorizationError(LOGIN_FAILED_ERR_MSG));
      return user;
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).end();
    })
    .catch(next);
};

export const getLoginedUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  return User.find({ _id }).orFail(new AuthorizationError())
    .then((user) => res.send(user))
    .catch(next);
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
