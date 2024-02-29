import { STATUS_CODES } from "./status-codes";

class CustomError extends Error {
  statusCode: number = 500;
}

class NotFoundError extends CustomError {
  constructor(message = STATUS_CODES.NOT_FOUND.message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND.statusCode;
  }
}

class BadRequestError extends CustomError {
  constructor(message = STATUS_CODES.BAD_REQUEST.message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST.statusCode;
  }
}

class InternalServerError extends CustomError {
  constructor(message = STATUS_CODES.INTERNAL_SERVER_ERROR.message) {
    super(message);
    this.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode;
  }
}