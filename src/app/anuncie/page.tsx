import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Anuncie em breve | UNUS Núcleo Imobiliário',
  description: 'O marketing de precisão para seu imóvel. Em breve.',
  robots: { index: false, follow: true },
};

export default function AnunciePage() {
  return <ComingSoon title="O marketing de precisão para seu imóvel" />;
}
