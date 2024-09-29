import { BaseError, ErrorResponse } from '../Interfaces/Errors';

export class UserDoesNotExist extends BaseError {}
export class UserAlreadyExists extends BaseError {}

export class UserDoesNotExistRes extends ErrorResponse {
  constructor() {
    super();
    this.code = 404;
    this.title = 'User Does Not Exist';
    this.message = { error: 'User does not exist' };
  }
}

export class UserAlreadyExistsRes extends ErrorResponse {
  constructor() {
    super();
    this.code = 409;
    this.title = 'User Already Exists';
    this.message = { error: 'User already exists' };
  }
}
