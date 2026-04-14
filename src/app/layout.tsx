import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LazyFixedButtons } from '@/components/LazyFixedButtons';
import { LazyStickySearchBar } from '@/components/LazyStickySearchBar';

const inter = Inter({
  subsets: ['latin'],
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
    default: 'UNUS Núcleo Imobiliário — Inteligência Imobiliária em Alto Padrão',
    template: '%s | UNUS Núcleo Imobiliário',
  },
  description: 'Consultoria imobiliária de alto padrão em São José, Campinas e praias de Florianópolis. Onde inteligência encontra patrimônio.',
  metadataBase: new URL('https://unusnucleoimobiliario.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://unusnucleoimobiliario.com.br',
    title: 'UNUS Núcleo Imobiliário — Inteligência Imobiliária em Alto Padrão',
    description: 'Consultoria imobiliária de alto padrão em São José, Campinas e praias de Florianópolis. Onde inteligência encontra patrimônio.',
    siteName: 'UNUS Núcleo Imobiliário',
    images: [
      {
        url: 'https://unusnucleoimobiliario.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UNUS Núcleo Imobiliário',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNUS Núcleo Imobiliário — Inteligência Imobiliária em Alto Padrão',
    description: 'Consultoria imobiliária de alto padrão em São José, Campinas e praias de Florianópolis.',
    images: ['https://unusnucleoimobiliario.com.br/og-image.jpg'],
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
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
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
      </body>
    </html>
  );
}
