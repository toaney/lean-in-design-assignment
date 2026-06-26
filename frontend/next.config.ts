import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leanin.org',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig
