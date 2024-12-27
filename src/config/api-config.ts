export const API_CONFIG = {
  baseUrl: 'http://localhost:3001/api', // Changed port to 3001
  timeout: 10000,
  retries: 3,
  endpoints: {
    bubble: {
      validate: '/bubble/validate',
      metadata: '/bubble/metadata'
    }
  }
};