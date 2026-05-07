import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Blog em breve | UNUS Núcleo Imobiliário',
  description: 'Insights e inteligência imobiliária. Em breve.',
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return <ComingSoon title="Insights e Inteligência Imobiliária" />;
}
