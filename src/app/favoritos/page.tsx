import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Favoritos em breve | UNUS Núcleo Imobiliário',
  description: 'Sua curadoria pessoal de ativos exclusivos. Em breve.',
  robots: { index: false, follow: true },
};

export default function FavoritosPage() {
  return <ComingSoon title="Sua curadoria pessoal de ativos exclusivos" />;
}
