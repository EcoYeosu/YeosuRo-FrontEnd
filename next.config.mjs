/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['yeosuroimage.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
