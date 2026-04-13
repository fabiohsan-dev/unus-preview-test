import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FixedButtons } from '@/components/FixedButtons';
import { StickySearchBar } from '@/components/StickySearchBar';
import { getMetadataServer } from '@/lib/server/vistaService';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let metadataData;
  try {
    metadataData = await getMetadataServer();
  } catch (e) {
    console.error('Erro ao buscar metadados no layout:', e);
  }

  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-[var(--color-background)] antialiased font-sans">
        <Header />
        <StickySearchBar metadata={metadataData} />
        <main>{children}</main>
        <Footer />
        <FixedButtons />
      </body>
    </html>
  );
}
