import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Bath, BedDouble, Maximize } from 'lucide-react';
import { ContentImage } from './ContentImage';

interface Opportunity {
  id: string | number;
  slug?: string;
  image: string;
  type: string;
  title: string;
  location: string;
  bedrooms: number | string;
  suites: number | string;
  bathrooms: number | string;
  area: string;
  price: string;
  badge: string;
}

interface SalesOpportunitiesProps {
  opportunities?: Opportunity[];
}

export function SalesOpportunities({ opportunities: initialOpportunities }: SalesOpportunitiesProps) {
  const displayOpportunities = initialOpportunities ?? [];
  if (displayOpportunities.length === 0) return null;

  return (
    <section id="investimentos" className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span
                className="text-[var(--champagne-readable)] text-[10px] font-semibold uppercase tracking-[0.3em]"
              >
                Para Investidores
              </span>
            </div>
            <h2
              className="text-[var(--color-heading)] text-title-section leading-[1.1] tracking-[-0.02em] font-light"
            >
              Lançamentos &
              <br />
              <span className="font-semibold">oportunidades</span>
            </h2>
          </div>
          <p
            className="text-[var(--color-body)] text-[15px] leading-relaxed max-w-[360px] font-light"
          >
            Imóveis com potencial real de valorização, selecionados por dados de mercado e
            expertise local.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayOpportunities.map((item) => {
            const isTerrain =
              item.type.toLowerCase().includes('terreno') ||
              item.type.toLowerCase().includes('lote');

            return (
              <Link
                key={item.id}
                href={`/imovel/${item.slug || item.id}`}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--secondary-900)] mb-5">
                  <ContentImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={70}
                    protectedContent
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 bg-[var(--champagne)] text-[var(--neutral-900)] text-[9px] font-bold uppercase tracking-[0.15em]"
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <p
                    className="text-[var(--color-caption)] text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
                  >
                    {item.location}
                  </p>
                  <h3
                    className="text-[var(--color-heading)] text-title-card font-normal leading-tight mb-4 line-clamp-2 min-h-[52px]"
                  >
                    {item.title}
                  </h3>

                  <div
                    className="flex items-center gap-4 text-[var(--color-body)] text-[12px] font-normal mb-4 pb-4 border-b border-[var(--neutral-300)] flex-wrap"
                  >
                    {isTerrain ? (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-[var(--color-caption)]" strokeWidth={1.2} />
                        Área: {item.area}
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="w-4 h-4 text-[var(--color-caption)]" strokeWidth={1.2} />
                          {item.bedrooms} dorms.
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-[var(--color-caption)]" strokeWidth={1.2} />
                          {item.bathrooms} banh.
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Maximize className="w-4 h-4 text-[var(--color-caption)]" strokeWidth={1.2} />
                          {item.area}
                        </span>
                      </>
                    )}
                  </div>

                  <p
                    className="text-[var(--color-heading)] text-price-opportunity-size font-serif font-medium mt-auto"
                  >
                    {item.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/venda?ordem=mais-novo"
            className="inline-flex items-center gap-3 border border-[var(--secondary-900)] text-[var(--color-heading)] px-10 py-4 text-[11px] font-medium uppercase tracking-[0.18em] hover:bg-[var(--secondary-900)] hover:text-white transition-all duration-300"
          >
            Ver todos os lançamentos
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
