import { Errback, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "./custom-errors";
import { STATUS_CODES } from "./status-codes";
import mongoose, { Error } from "mongoose";

export const errHandleMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = STATUS_CODES.BAD_REQUEST.statusCode;
  }

  if (!statusCode) {
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode
    message = STATUS_CODES.INTERNAL_SERVER_ERROR.message;
  }
  res.status(statusCode).send({ message })
}