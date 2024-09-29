import { z } from 'zod';

export class UserValidator {
  public static Email = z.string().email();
  public static Password = z
    .string()
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
    );
}
