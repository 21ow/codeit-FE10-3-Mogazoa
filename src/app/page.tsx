'use client';

import Products from '@/feature/landingpage/Products';
import { useInitAuthStore } from '@/store/useAuthStore';

const Page = () => {
  useInitAuthStore();
  return <Products />;
};

export default Page;
