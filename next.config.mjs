/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yeosuroimage.s3.ap-northeast-2.amazonaws.com',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};
export default nextConfig;