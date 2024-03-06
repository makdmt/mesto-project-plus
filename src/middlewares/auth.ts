import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/users';
import { UnauthorizedError } from './errors/custom-errors';

const AUTHORIZATION_REQUIRED_ERR_MSG = 'authorization required';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  let payload: JwtPayload | string = {};

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedError(AUTHORIZATION_REQUIRED_ERR_MSG);
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === 'string' || !('_id' in payload)) throw new UnauthorizedError(AUTHORIZATION_REQUIRED_ERR_MSG);
  } catch (err) {
    next(err);
  }
  if (typeof payload !== 'string' && ('_id' in payload)) {
    req.user._id = payload._id;
  }
  next();
};
