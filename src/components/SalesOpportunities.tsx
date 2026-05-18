import { HomeDevelopmentsCTA } from '@/components/sections/HomeDevelopmentsCTA';
import type { VistaImovelItem } from '@/types/vista';

interface SalesOpportunitiesProps {
  developments?: VistaImovelItem[];
  developmentsCount?: number;
}

export function SalesOpportunities({
  developments: initialDevelopments,
  developmentsCount,
}: SalesOpportunitiesProps) {
  const displayDevelopments = initialDevelopments ?? [];
  if (displayDevelopments.length === 0) return null;

  return (
    <>
      {/* Heading editorial da seção — âncora preservada */}
      <div
        className="pt-20 lg:pt-28 pb-10 lg:pb-14 px-6 sm:px-8 lg:px-12 bg-white"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 lg:gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[1px] bg-[var(--champagne)]" />
                <span className="text-[var(--champagne-readable)] text-text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)]">
                  Para Investidores
                </span>
              </div>
              <h2 className="text-[var(--color-heading)] text-title-section font-serif leading-none tracking-[-0.02em] font-light">
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
      <HomeDevelopmentsCTA
        developments={displayDevelopments}
        developmentsCount={developmentsCount ?? displayDevelopments.length}
      />
    </>
  );
}
