import { STATUS_CODES } from './status-codes';

export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = STATUS_CODES.NOT_FOUND.message) {
    super(STATUS_CODES.NOT_FOUND.statusCode, message);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = STATUS_CODES.BAD_REQUEST.message) {
    super(STATUS_CODES.BAD_REQUEST.statusCode, message);
  }
}

export class ConflictError extends CustomError {
  constructor(message = STATUS_CODES.CONFLICT.message) {
    super(STATUS_CODES.CONFLICT.statusCode, message);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = STATUS_CODES.INTERNAL_SERVER_ERROR.message) {
    super(STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode, message);
  }
}
