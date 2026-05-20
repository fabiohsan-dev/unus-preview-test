import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    qualities: [60, 70, 72, 75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sdr-w.agenciaalea.com.br',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '*.vistahost.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.vistasoft.com.br',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: '/busca',
        destination: '/venda',
        permanent: true,
      },
    ];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.vercel-insights.com",
      "style-src 'self' 'unsafe-inline'",
      [
        "img-src 'self' data: blob:",
        "https://images.unsplash.com",
        "https://sdr-w.agenciaalea.com.br",
        "https://img.youtube.com",
        "https://*.vistahost.com.br",
        "https://www.vistasoft.com.br",
      ].join(' '),
      "font-src 'self' data:",
      [
        "connect-src 'self'",
        "https://*.supabase.co",
        "https://challenges.cloudflare.com",
        "https://*.vercel-insights.com",
      ].join(' '),
      "frame-src https://challenges.cloudflare.com https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://wa.me https://api.whatsapp.com",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy',    value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
