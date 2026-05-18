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
      className="group relative overflow-hidden cursor-pointer aspect-[4/5] sm:aspect-[3/4] bg-black shadow-[var(--shadow-soft)]"
    >
      <ContentImage
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-[1.065] opacity-80 group-hover:opacity-100"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={60}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-7">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/60 text-text-micro font-medium uppercase tracking-[var(--tracking-micro)] mb-1.5 leading-snug">
              {item.subtitle}
            </p>
            <h3 className="text-white leading-[1.2] text-xl font-medium">
              {item.title}
            </h3>
            <span className="text-white/60 text-text-xs font-medium mt-1.5 block leading-snug tracking-wider">
              Curadoria UNUS
            </span>
          </div>
          <div className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-white/5 backdrop-blur-sm shrink-0 ml-3">
            <ArrowUpRight className="w-[15px] h-[15px] text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
