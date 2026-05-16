import { type OpportunityCardData } from '@/components/cards/OpportunityCard';
import { HomeDevelopmentsCTA } from '@/components/sections/HomeDevelopmentsCTA';

interface SalesOpportunitiesProps {
  opportunities?: OpportunityCardData[];
}

export function SalesOpportunities({ opportunities: initialOpportunities }: SalesOpportunitiesProps) {
  const displayOpportunities = initialOpportunities ?? [];
  if (displayOpportunities.length === 0) return null;

  return (
    <>
      {/* Heading editorial da seção — âncora preservada */}
      <div
        id="investimentos"
        className="pt-20 lg:pt-28 pb-10 lg:pb-14 px-6 sm:px-8 lg:px-12 bg-[var(--off-white)]"
      >
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[1px] bg-[var(--champagne)]" />
                <span className="text-[var(--champagne-readable)] text-[11px] font-semibold uppercase tracking-[0.22em]">
                  Para Investidores
                </span>
              </div>
              <h2 className="text-[var(--color-heading)] text-[clamp(38px,4.4vw,64px)] leading-[1.1] tracking-[-0.02em] font-light">
                Lançamentos &
                <br />
                <span className="font-semibold">oportunidades</span>
              </h2>
            </div>
            <p className="text-[var(--color-body)] text-[15px] leading-[1.65] max-w-[360px] font-light">
              Imóveis com potencial real de valorização, selecionados por dados de mercado e
              expertise local.
            </p>
          </div>
        </div>
      </div>

      {/* Card editorial de empreendimentos — herda o contexto da seção acima */}
      <HomeDevelopmentsCTA developments={displayOpportunities} />
    </>
  );
}
