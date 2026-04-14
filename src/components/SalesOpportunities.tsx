import Link from 'next/link';
import { ArrowUpRight, Bath, BedDouble, Maximize } from 'lucide-react';
import { ContentImage } from './ContentImage';

interface Opportunity {
  id: string | number;
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

const fallbackOpportunities: Opportunity[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDF8fHx8MTc3NTA4OTgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'Casa',
    title: 'Residência Áurea',
    location: 'Campinas, São José',
    bedrooms: 4,
    suites: 4,
    bathrooms: 5,
    area: '880m²',
    price: 'R$ 18.500.000',
    badge: 'Exclusivo',
  },
];

export function SalesOpportunities({ opportunities: initialOpportunities }: SalesOpportunitiesProps) {
  const displayOpportunities =
    initialOpportunities && initialOpportunities.length > 0
      ? initialOpportunities
      : fallbackOpportunities;

  return (
    <section id="investimentos" className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--primary-500)]" />
              <span
                className="text-[var(--color-accent-text)] text-[10px] uppercase tracking-[0.3em]"
                style={{ fontWeight: 600 }}
              >
                Para Investidores
              </span>
            </div>
            <h2
              className="text-[var(--color-heading)] text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.02em]"
              style={{ fontWeight: 300 }}
            >
              Lançamentos &
              <br />
              <span style={{ fontWeight: 600 }}>oportunidades</span>
            </h2>
          </div>
          <p
            className="text-[var(--color-body)] text-[15px] leading-relaxed max-w-[360px]"
            style={{ fontWeight: 300 }}
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
                href={`/imovel/${item.id}`}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--secondary-900)] mb-5">
                  <ContentImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 bg-[var(--primary-500)] text-white text-[9px] uppercase tracking-[0.15em]"
                      style={{ fontWeight: 700 }}
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
                    className="text-[var(--color-caption)] text-[11px] uppercase tracking-[0.12em] mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    {item.location}
                  </p>
                  <h3
                    className="text-[var(--color-heading)] text-[22px] leading-tight mb-4 line-clamp-2 min-h-[52px]"
                    style={{ fontWeight: 500 }}
                  >
                    {item.title}
                  </h3>

                  <div
                    className="flex items-center gap-4 text-[var(--color-body)] text-[12px] mb-4 pb-4 border-b border-[var(--neutral-300)] flex-wrap"
                    style={{ fontWeight: 400 }}
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
                    className="text-[var(--color-heading)] text-[20px] mt-auto"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}
                  >
                    {item.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
