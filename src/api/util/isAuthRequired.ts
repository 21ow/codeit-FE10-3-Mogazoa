export const NO_TOKEN_ENDPOINTS = [
  '/auth/',
  '/categories',
  '/oauthApps',
  '/products',
];

export const isAuthRequired = (
  path: string,
  method: string,
  userId?: string
): boolean => {
  if (path === '/users/me' || path === `/users/${userId}`) {
    return true;
  }

  if (path.startsWith('/users/') && path !== `/users/${userId}`) {
    return false;
  }

  if (method === 'POST' && path.startsWith('/products')) {
    return true;
  }

  return !NO_TOKEN_ENDPOINTS.some((endpoint) => path.startsWith(endpoint));
};
