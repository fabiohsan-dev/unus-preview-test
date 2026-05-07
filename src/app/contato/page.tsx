import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Contato em breve | UNUS Núcleo Imobiliário',
  description: 'Conecte-se com nossa curadoria. Em breve.',
  robots: { index: false, follow: true },
};

export default function ContatoPage() {
  return <ComingSoon title="Conecte-se com nossa curadoria" />;
}
