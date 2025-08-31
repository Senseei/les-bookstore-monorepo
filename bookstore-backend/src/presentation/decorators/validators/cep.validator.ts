import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cep', async: false })
export class CepConstraint implements ValidatorConstraintInterface {
  validate(cep: string) {
    if (!cep) return false;

    // Brazilian postal code format: 12345-678 or 12345678
    const cleanCode = cep.replace(/\D/g, '');
    return /^\d{8}$/.test(cleanCode);
  }

  defaultMessage() {
    return 'Postal code must be a valid Brazilian CEP (8 digits)';
  }
}

export function IsCep(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CepConstraint,
    });
  };
}
