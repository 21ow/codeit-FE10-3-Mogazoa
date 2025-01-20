import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getToken } from '@/lib/localStorage';

const useAuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = getToken();
  const TOKEN_REQUIRED_PAGE = ['/add-product'];

  useLayoutEffect(() => {
    console.log(token, '가드 토큰');
    if (TOKEN_REQUIRED_PAGE.includes(pathname) && !token) {
      router.push('/auth/signin');
    }
  }, [pathname, token]);
};

export default useAuthGuard;
