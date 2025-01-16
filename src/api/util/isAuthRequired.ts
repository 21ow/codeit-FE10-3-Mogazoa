export const NO_TOKEN_ENDPOINTS = [
  '/auth/',
  '/categories',
  '/oauthApps',
  '/products',
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

  if (method === 'POST' && path.startsWith('/products')) {
    return true;
  }

  return !NO_TOKEN_ENDPOINTS.some((endpoint) => path.startsWith(endpoint));
};
