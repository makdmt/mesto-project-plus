import { STATUS_CODES } from "./status-codes";

export class CustomError extends Error {
  statusCode: number = 500;
}

export class NotFoundError extends CustomError {
  constructor(message = STATUS_CODES.NOT_FOUND.message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND.statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message = STATUS_CODES.BAD_REQUEST.message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST.statusCode;
  }
}

export class InternalServerError extends CustomError {
  constructor(message = STATUS_CODES.INTERNAL_SERVER_ERROR.message) {
    super(message);
    this.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode;
  }
}