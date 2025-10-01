export const env = {
  API_URL: import.meta.env.API_URL || 'http://localhost:3000/api',
  ENABLE_API_DELAY: import.meta.env.ENABLE_API_DELAY === 'true' || false,
}
