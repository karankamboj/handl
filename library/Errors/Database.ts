import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

// Errors
export class DatabaseConnectionFailure extends BaseError {}
export class DatabaseError extends BaseError {}

// Responses
export class DatabaseConnectionFailureResponse extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Database Connection Failure';
    this.message = {
      error: 'Error occurred while connecting to the database'
    };
  }
}

export class DatabaseErrorResponse extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Database Error';
    this.message = {
      error: 'Error occurred while executing database operation'
    };
  }
}
