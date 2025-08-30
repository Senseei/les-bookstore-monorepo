import { ValidationError } from 'class-validator';

export class ValidationErrorFormatter {
  public static format(errors: ValidationError[]): string {
    const formattedErrors = errors.map((error) => this.formatError(error, ''));
    return formattedErrors.join('\n');
  }

  // New method that returns an array of error messages
  public static formatAsArray(errors: ValidationError[]): string[] {
    const result: string[] = [];
    errors.forEach((error) => {
      this.collectErrors(error, '', result);
    });
    return result;
  }

  private static collectErrors(
    error: ValidationError,
    prefix: string,
    result: string[],
  ): void {
    const fieldName = prefix ? `${prefix}.${error.property}` : error.property;

    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        this.collectErrors(child, fieldName, result);
      });
    } else if (error.constraints) {
      const constraintMessages = Object.values(error.constraints);
      constraintMessages.forEach((message) => {
        result.push(`${fieldName}: ${message}`);
      });
    }
  }

  private static formatError(error: ValidationError, prefix: string): string {
    const fieldName = prefix ? `${prefix}.${error.property}` : error.property;

    if (error.children && error.children.length > 0) {
      return error.children
        .map((child) => this.formatError(child, fieldName))
        .join('\n');
    }

    if (error.constraints) {
      const constraintMessages = Object.values(error.constraints);
      return constraintMessages
        .map((message) => `• ${fieldName}: ${message}`)
        .join('\n');
    }

    return `• ${fieldName}: is invalid`;
  }

  public static formatAsObject(
    errors: ValidationError[],
  ): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    errors.forEach((error) => {
      this.buildErrorObject(error, '', result);
    });

    return result;
  }

  private static buildErrorObject(
    error: ValidationError,
    prefix: string,
    result: Record<string, string[]>,
  ): void {
    const fieldName = prefix ? `${prefix}.${error.property}` : error.property;

    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        this.buildErrorObject(child, fieldName, result);
      });
    } else if (error.constraints) {
      result[fieldName] = Object.values(error.constraints);
    }
  }
}
