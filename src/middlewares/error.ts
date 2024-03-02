import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/errors";
import { STATUS_CODES } from "../errors/status-codes";

export const errHandleMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode
    message = STATUS_CODES.INTERNAL_SERVER_ERROR.message;
  }
  res.status(statusCode).send({ message })
}