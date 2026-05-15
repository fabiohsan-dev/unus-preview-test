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
                <div className="relative aspect-[4/4.75] overflow-hidden bg-[var(--secondary-900)] mb-5">
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
                      className="px-3 py-1 bg-[var(--champagne)] text-[var(--neutral-900)] text-[10px] font-bold uppercase tracking-[0.12em]"
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
                    className="text-[var(--color-caption)] text-[12px] font-medium uppercase tracking-[0.10em] mb-2"
                  >
                    {item.location}
                  </p>
                  <h3
                    className="text-[var(--color-heading)] text-[clamp(22px,1.65vw,27px)] font-normal leading-tight mb-4 line-clamp-2 min-h-[56px]"
                  >
                    {item.title}
                  </h3>

                  <div
                    className="flex items-center gap-x-[15px] gap-y-2.5 text-[var(--color-body)] text-[13px] font-normal mb-[17px] pb-[17px] border-b border-[var(--neutral-300)] flex-wrap"
                  >
                    {isTerrain ? (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="w-[15px] h-[15px] text-[var(--color-caption)]" strokeWidth={1.2} />
                        Área: {item.area}
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="w-[15px] h-[15px] text-[var(--color-caption)]" strokeWidth={1.2} />
                          {item.bedrooms} dorms.
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="w-[15px] h-[15px] text-[var(--color-caption)]" strokeWidth={1.2} />
                          {item.bathrooms} banh.
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Maximize className="w-[15px] h-[15px] text-[var(--color-caption)]" strokeWidth={1.2} />
                          {item.area}
                        </span>
                      </>
                    )}
                  </div>

                  <p
                    className="text-[var(--color-heading)] text-[clamp(22px,1.6vw,28px)] font-serif font-medium mt-auto"
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
