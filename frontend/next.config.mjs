/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/tag/:path*', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
