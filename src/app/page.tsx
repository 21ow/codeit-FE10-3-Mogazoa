'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/api/storage/authStorage';

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  }, [router]);

  return <div>로딩 중...</div>;
};

export default RootPage;
