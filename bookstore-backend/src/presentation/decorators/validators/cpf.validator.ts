import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
export class CpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    if (!cpf) return false;
    // Remove non-numeric characters
    const cleanCpf = cpf.replace(/\D/g, '');

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

    // Validate CPF algorithm
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;

    return (
      digit1 === parseInt(cleanCpf.charAt(9)) &&
      digit2 === parseInt(cleanCpf.charAt(10))
    );
  }

  defaultMessage() {
    return 'CPF must be a valid Brazilian CPF number';
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CpfConstraint,
    });
  };
}
