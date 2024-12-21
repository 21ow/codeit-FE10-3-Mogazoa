import NO_TOKEN_ENDPOINTS from '../constant/noTokenEndPoints';

const isAuthRequired = (path: string, method: string): boolean => {
  if (path === '/users/me') {
    return true;
  }

  if (path.startsWith('/users/')) {
    return false;
  }

  if (method === 'POST' && path.startsWith('/products')) {
    return true;
  }

  return !NO_TOKEN_ENDPOINTS.some((endpoint) => path.startsWith(endpoint));
};

export default isAuthRequired;
