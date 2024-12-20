import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    additionalData: `@use '@/assets/variables' as *;`,
  },
};

export default nextConfig;
