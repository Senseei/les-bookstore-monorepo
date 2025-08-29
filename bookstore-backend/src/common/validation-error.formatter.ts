import { ValidationError } from 'class-validator';

export class ValidationErrorFormatter {
  public static format(errors: ValidationError[]): string {
    return errors.map((error) => this.formatError(error)).join(';\n');
  }

  private static formatError(error: ValidationError): string {
    if (error.children && error.children.length > 0) {
      return error.children.map((child) => this.formatError(child)).join('; ');
    }

    return error.constraints
      ? Object.values(error.constraints).join('; ')
      : 'is invalid';
  }
}
