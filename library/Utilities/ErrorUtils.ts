import { LoggerUtils } from './LoggerUtils';

export type CustomErrorType = new (...args: any[]) => Error;

export class ErrorUtils {
  public static throwCustomError<T extends CustomErrorType>(
    error: unknown,
    message: string,
    CustomError: T
  ): never {
    LoggerUtils.error(error);

    if (error instanceof Error) {
      throw new CustomError(`${message}: ${error.message}`);
    } else {
      throw new CustomError(message);
    }
  }
}
