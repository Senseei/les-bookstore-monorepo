import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'br-phone', async: false })
export class BrPhoneConstraint {
  validate(phone: string) {
    if (!phone) return false;

    // Brazilian phone number format: (XX) XXXXX-XXXX
    const cleanPhone = phone.replace(/\D/g, '');
    return /^\d{11}$/.test(cleanPhone);
  }

  defaultMessage() {
    return 'Phone number must be a valid Brazilian phone number';
  }
}

export function IsBrPhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: BrPhoneConstraint,
    });
  };
}
