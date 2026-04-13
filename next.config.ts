import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unusnucleoimobiliario.com.br',
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
        protocol: 'http',
        hostname: 'www.vistasoft.com.br',
      },
    ],
  },
};

export default nextConfig;
