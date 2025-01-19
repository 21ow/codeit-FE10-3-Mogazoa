'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const useAuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const TOKEN_REQUIRED_PAGE = ['/add-product'];

  useEffect(() => {
    if (TOKEN_REQUIRED_PAGE.includes(pathname) && !token) {
      router.push('/auth/signin');
    }
  }, [pathname, token]);
};

export default useAuthGuard;
