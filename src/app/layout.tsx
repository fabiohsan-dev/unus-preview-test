import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import '../styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LazyFixedButtons } from '@/components/LazyFixedButtons';
import { LazyStickySearchBar } from '@/components/LazyStickySearchBar';
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Consultoria imobiliária de alto padrão. Onde você mora define como você vive!',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: 'Consultoria imobiliária de alto padrão. Onde você mora define como você vive!',
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UNUS Núcleo Imobiliário',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: 'Consultoria imobiliária de alto padrão. Onde você mora define como você vive!',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.vistahost.com.br" />
      </head>
      <body className="min-h-screen bg-[var(--color-background)] antialiased font-sans">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--secondary-900)] focus:text-white focus:text-[12px] focus:uppercase focus:tracking-widest"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        <LazyStickySearchBar />
        <main id="main-content">{children}</main>
        <Footer />
        <LazyFixedButtons />
        <SpeedInsights />
      </body>
    </html>
  );
}
