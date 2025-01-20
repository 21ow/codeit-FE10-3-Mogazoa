import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getToken, useAuthStore } from '@/store/useAuthStore';

const useAuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = getToken();
  const storeToken = useAuthStore((state) => state.token);
  const TOKEN_REQUIRED_PAGE = ['/add-product'];

  useLayoutEffect(() => {
    if (TOKEN_REQUIRED_PAGE.includes(pathname) && !token) {
      router.push('/auth/signin');
    }
  }, [pathname, storeToken]);
};

export default useAuthGuard;
