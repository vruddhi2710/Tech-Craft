import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/#home',
        permanent: false,
      },
      {
        source: '/about-us',
        destination: '/#home',
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
        source: '/internship',
        destination: '/#internship',
        permanent: false,
      },
      {
        source: '/internships',
        destination: '/#internship',
        permanent: false,
      },
      {
        source: '/workshop',
        destination: '/#workshops',
        permanent: false,
      },
      {
        source: '/workshops',
        destination: '/#workshops',
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
