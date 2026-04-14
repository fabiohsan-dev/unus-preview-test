import type { Metadata } from 'next';
import SmartSearchWrapper from '@/components/SmartSearchWrapper';

export const metadata: Metadata = {
  title: 'Busca Inteligente',
  description: 'Encontre o imóvel ideal usando linguagem natural. Nossa inteligência artificial interpreta sua busca e retorna os melhores resultados.',
};

export default function BuscaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <div className="mx-auto max-w-[1400px] px-6 pt-32 pb-16 sm:px-8 lg:px-12 lg:pt-36 lg:pb-20">
          <div className="max-w-[800px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[1px] bg-[var(--primary-500)]" />
              <span
                className="text-[11px] uppercase tracking-[0.25em] text-[var(--primary-500)]"
                style={{ fontWeight: 600 }}
              >
                Inteligência Artificial
              </span>
            </div>
            <h1
              className="text-[var(--color-heading)] text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.02em] mb-5"
              style={{ fontWeight: 300 }}
            >
              Busca <span style={{ fontWeight: 600 }}>Inteligente</span>
            </h1>
            <p
              className="max-w-[520px] text-[16px] leading-relaxed text-[var(--color-body)]"
              style={{ fontWeight: 300 }}
            >
              Descreva o imóvel que você procura em linguagem natural.
              Nossa IA interpreta sua busca e encontra as melhores opções
              do nosso acervo.
            </p>
          </div>
        </div>
      </section>

      {/* Busca */}
      <section className="bg-[var(--color-background)]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <SmartSearchWrapper />
        </div>
      </section>
    </div>
  );
}
