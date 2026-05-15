import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OpportunityCard, type OpportunityCardData } from '@/components/cards/OpportunityCard';

interface SalesOpportunitiesProps {
  opportunities?: OpportunityCardData[];
}

export function SalesOpportunities({ opportunities: initialOpportunities }: SalesOpportunitiesProps) {
  const displayOpportunities = initialOpportunities ?? [];
  if (displayOpportunities.length === 0) return null;

  return (
    <section id="investimentos" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-8 lg:gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span
                className="text-[var(--champagne-readable)] text-[11px] font-semibold uppercase tracking-[0.22em]"
              >
                Para Investidores
              </span>
            </div>
            <h2
              className="text-[var(--color-heading)] text-[clamp(38px,4.4vw,64px)] leading-[1.1] tracking-[-0.02em] font-light"
            >
              Lançamentos &
              <br />
              <span className="font-semibold">oportunidades</span>
            </h2>
          </div>
          <p
            className="text-[var(--color-body)] text-[15px] leading-[1.65] max-w-[360px] font-light"
          >
            Imóveis com potencial real de valorização, selecionados por dados de mercado e
            expertise local.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/venda?ordem=mais-novo"
            className="inline-flex items-center gap-3 border border-[var(--secondary-900)] text-[var(--color-heading)] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-[var(--secondary-900)] hover:text-white transition-all duration-300"
          >
            Ver todos os lançamentos
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
