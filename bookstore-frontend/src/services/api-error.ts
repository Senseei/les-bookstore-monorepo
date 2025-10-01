export class ApiError extends Error {
  public statusCode: number
  public error: string
  public message: string

  constructor(statusCode: number, error: string, message: string) {
    super(message)
    this.statusCode = statusCode
    this.error = error
    this.message = message
    this.name = 'ApiError'
  }
}
