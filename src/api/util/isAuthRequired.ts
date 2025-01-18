export const NO_TOKEN_ENDPOINTS = [
  '/auth/',
  '/categories',
  '/oauthApps',
  '/users',
];

export const isAuthRequired = (
  path: string,
  method: string,
  userId?: string
): boolean => {
  if (path === '/users/me' || path === `/users/${userId}`) {
    return true;
  }

  if (method === 'GET' && path === '/products') {
    return true;
  }

  return !NO_TOKEN_ENDPOINTS.some((endpoint) => path.startsWith(endpoint));
};
