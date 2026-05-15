import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContentImage } from '@/components/ContentImage';

export interface CollectionCardData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

interface CollectionCardProps {
  item: CollectionCardData;
}

export function CollectionCard({ item }: CollectionCardProps) {
  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden cursor-pointer aspect-[3/4] bg-[var(--secondary-900)]"
    >
      <ContentImage
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={60}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/60 text-[11px] font-medium uppercase tracking-[0.15em] mb-1">
              {item.subtitle}
            </p>
            <h3 className="text-white text-[24px] font-medium leading-tight">
              {item.title}
            </h3>
            <span className="text-white/50 text-[12px] font-medium mt-2 block">
              Curadoria UNUS
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-white/5 backdrop-blur-sm">
            <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
