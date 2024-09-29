import { ErrorResponse } from '../Interfaces/Errors';
import { ServerEvent } from '../Interfaces/HandlerController';
import { ErrorUtils } from '../Utilities/ErrorUtils';

export function Catchable(log?: boolean) {
  return function (
    _target: ServerEvent,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<void>>
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      this: ServerEvent,
      ...args: any[]
    ): Promise<void> {
      const res = this.res;

      if (!originalMethod) {
        throw new Error('Method not found');
      }

      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        if (log) {
          console.error(error);
        }

        const errorRes: ErrorResponse = ErrorUtils.getErrorEmbed(error, log);

        res.status(errorRes.code).send(errorRes.message);
      }
    };
  };
}
