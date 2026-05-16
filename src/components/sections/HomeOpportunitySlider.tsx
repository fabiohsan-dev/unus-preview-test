import { OpportunityCard, type OpportunityCardData } from '@/components/cards/OpportunityCard';

type HomeOpportunitySliderProps = {
  opportunities?: OpportunityCardData[];
};

export function HomeOpportunitySlider({ opportunities }: HomeOpportunitySliderProps) {
  const items = opportunities ?? [];
  if (items.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[var(--off-white)]">
      <div className="max-w-[1320px] mx-auto">

        {/* Section header */}
        <div className="mb-10 lg:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[var(--champagne)]" />
            <span className="text-[var(--champagne-readable)] text-[11px] font-semibold uppercase tracking-[0.22em]">
              Curadoria UNUS
            </span>
          </div>
          <h2 className="text-[var(--deep-blue)] text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-[-0.02em] font-light">
            Imóveis
            <br />
            <span className="font-semibold">à venda</span>
          </h2>
        </div>

        {/* Slider track — CSS scroll-snap, sem biblioteca externa, sem autoplay */}
        <div className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
            >
              <OpportunityCard item={item} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
