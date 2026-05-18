import Link from 'next/link';
import { ArrowUpRight, Bath, BedDouble, Maximize } from 'lucide-react';
import { ContentImage } from '@/components/ContentImage';

export interface OpportunityCardData {
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

interface OpportunityCardProps {
  item: OpportunityCardData;
}

export function OpportunityCard({ item }: OpportunityCardProps) {
  const isTerrain =
    item.type.toLowerCase().includes('terreno') ||
    item.type.toLowerCase().includes('lote');

  return (
    <Link
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
          <span className="px-3 py-1 bg-[var(--champagne)]/95 text-[var(--primary-500)] border border-[var(--primary-500)]/20 text-[10px] font-extrabold uppercase tracking-[0.11em]">
            {item.badge}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex flex-col flex-1 mt-1">
        <p className="text-[var(--secondary-400)] text-text-micro uppercase tracking-[var(--tracking-micro)] font-medium mb-3 opacity-80">
          {item.location}
        </p>
        <h3 className="text-[var(--color-heading)] text-2xl leading-tight mb-6 line-clamp-2 font-serif font-light tracking-[-0.02em]">
          {item.title}
        </h3>

        <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-[var(--champagne)]/30">
          {isTerrain ? (
            <div>
              <Maximize className="w-[16px] h-[16px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
              <p className="text-[var(--color-heading)] text-[14px] font-medium">{item.area}</p>
              <p className="text-[var(--secondary-400)] text-[9px] uppercase tracking-wider font-medium">ÁREA</p>
            </div>
          ) : (
            <>
              <div>
                <BedDouble className="w-[16px] h-[16px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                <p className="text-[var(--color-heading)] text-[14px] font-medium">{item.bedrooms}</p>
                <p className="text-[var(--secondary-400)] text-[9px] uppercase tracking-wider font-medium">QUARTOS</p>
              </div>
              <div>
                <Bath className="w-[16px] h-[16px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                <p className="text-[var(--color-heading)] text-[14px] font-medium">{item.bathrooms}</p>
                <p className="text-[var(--secondary-400)] text-[9px] uppercase tracking-wider font-medium">BANHEIROS</p>
              </div>
              <div>
                <Maximize className="w-[16px] h-[16px] text-[var(--secondary-400)] mb-1.5" strokeWidth={1.2} />
                <p className="text-[var(--color-heading)] text-[14px] font-medium">{item.area}</p>
                <p className="text-[var(--secondary-400)] text-[9px] uppercase tracking-wider font-medium">ÁREA</p>
              </div>
            </>
          )}
        </div>

        <p className="text-[var(--color-heading)] text-3xl lg:text-[32px] font-serif font-medium mt-auto mb-4 tracking-[-0.02em]">
          {item.price}
        </p>
      </div>
    </Link>
  );
}
