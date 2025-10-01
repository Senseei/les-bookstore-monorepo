export class NetworkError extends Error {
  constructor() {
    super('Network error - no internet connection or server is unreachable')
    this.name = 'NetworkError'
  }
}
