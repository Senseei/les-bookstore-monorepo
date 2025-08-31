import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'password', async: false })
export class PasswordConstraint {
  validate(password: string) {
    // Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return typeof password === 'string' && passwordRegex.test(password);
  }

  defaultMessage() {
    return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordConstraint,
    });
  };
}
