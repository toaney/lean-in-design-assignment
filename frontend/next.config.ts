import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
