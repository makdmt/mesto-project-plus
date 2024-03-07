import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/users';
import { AuthorizationError } from './errors/custom-errors';

const AUTHORIZATION_REQUIRED_ERR_MSG = 'authorization required';
const TOKEN_FAILED_ERR_MSG = 'token failed';

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(`Bearer ${req.cookies.jwt}`);
  const { authorization = `Bearer ${req.cookies.jwt}` } = req.headers;
  let payload: JwtPayload | string = {};
  if (!authorization || !authorization.startsWith('Bearer ') || authorization === 'Bearer undefined') throw new AuthorizationError(AUTHORIZATION_REQUIRED_ERR_MSG);

  try {
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError(TOKEN_FAILED_ERR_MSG));
  }
  if (typeof payload !== 'string' && ('_id' in payload)) {
    req.user = { _id: payload._id };
  }
  next();
};
