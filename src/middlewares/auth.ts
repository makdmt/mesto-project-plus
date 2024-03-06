import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/users';
import { AuthorizationError } from './errors/custom-errors';

const AUTHORIZATION_REQUIRED_ERR_MSG = 'authorization required';
const TOKEN_FAILED_ERR_MSG = 'token failed';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  let payload: JwtPayload | string = {};

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) throw new AuthorizationError(AUTHORIZATION_REQUIRED_ERR_MSG);
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === 'string' || !('_id' in payload)) throw new AuthorizationError(TOKEN_FAILED_ERR_MSG);
  } catch (err) {
    next(new AuthorizationError(TOKEN_FAILED_ERR_MSG));
  }
  if (typeof payload !== 'string' && ('_id' in payload)) {
    req.user._id = payload._id;
  }
  next();
};
