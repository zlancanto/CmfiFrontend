export const API_ROUTE_PATHS = {
  auth: {
    register: '/auth/register'
  }
} as const;

export const toApiUrl = (baseUrl: string, path: string): string => {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
};
