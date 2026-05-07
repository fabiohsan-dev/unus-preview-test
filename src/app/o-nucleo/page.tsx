import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'O Núcleo em breve | UNUS Núcleo Imobiliário',
  description: 'Inteligência por trás do patrimônio. Em breve.',
  robots: { index: false, follow: true },
};

export default function NucleoPage() {
  return <ComingSoon title="O Núcleo — Inteligência por trás do patrimônio" />;
}
