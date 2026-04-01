const DEFAULT_API_BASE_URL = 'http://localhost:8080/api';

export const APP_ENV = {
  apiBaseUrl: import.meta.env.NG_APP_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
} as const;
