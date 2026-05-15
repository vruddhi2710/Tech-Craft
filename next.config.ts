import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/service',
        destination: '/#courses',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/#courses',
        permanent: false,
      },
      {
        source: '/training',
        destination: '/#courses',
        permanent: false,
      },
      {
        source: '/course',
        destination: '/courses',
        permanent: false,
      },
      {
        source: '/internships',
        destination: '/internship',
        permanent: false,
      },
      {
        source: '/workshop',
        destination: '/events',
        permanent: false,
      },
      {
        source: '/workshops',
        destination: '/events',
        permanent: false,
      },
      {
        source: '/event',
        destination: '/events',
        permanent: false,
      },
      {
        source: '/review',
        destination: '/#reviews',
        permanent: false,
      },
      {
        source: '/reviews',
        destination: '/#reviews',
        permanent: false,
      },
      {
        source: '/location',
        destination: '/#location',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
