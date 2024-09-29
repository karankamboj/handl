import { CustomError, ErrorResponse } from '../Interfaces/Errors';

export class MissingHeaders extends CustomError {
  missingHeaders: string[];

  constructor(message: string, headers: string[]) {
    super(message);
    this.missingHeaders = headers;
  }

  getMissingHeaders() {
    return this.missingHeaders;
  }
}

export class MissingParamsRes extends ErrorResponse {
  constructor(headers: string[]) {
    super();
    this.code = 400;
    this.title = 'Missing Headers in Request';
    this.message = { missingHeaders: headers };
  }
}
