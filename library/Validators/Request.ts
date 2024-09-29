import { z } from 'zod';

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED'
}

export class RequestValidator {
  public static Status = z.nativeEnum(RequestStatus);
}
