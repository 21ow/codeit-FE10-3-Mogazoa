'use client';

import { useInitAuthStore } from '@/store/useAuthStore';
import Products from '@/feature/landingpage/Products';
import '@/asset/globals.scss';

const Page = () => {
  useInitAuthStore();

  return <Products />;
};

export default Page;
