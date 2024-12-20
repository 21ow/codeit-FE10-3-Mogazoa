import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    additionalData: `@use '@/_asset/variables' as *;`,
  },
};

export default nextConfig;
