import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContentImage } from '@/components/ContentImage';

export interface BlogPostCardData {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  tags?: string[];
}

interface BlogPostCardProps {
  post: BlogPostCardData;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={post.href} className="group block">
      <div className="relative overflow-hidden aspect-[4/3] mb-5">
        <ContentImage
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={70}
        />
        <div className="absolute inset-0 bg-[var(--secondary-900)]/0 group-hover:bg-[var(--secondary-900)]/10 transition-colors duration-500" />
      </div>

      <span
        className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-caption)] mb-3 block"
        style={{ fontWeight: 500 }}
      >
        {post.date}
      </span>

      <h3
        className="text-[17px] leading-[1.35] text-[var(--secondary-900)] mb-3 group-hover:text-[var(--color-accent-text)] transition-colors duration-300"
        style={{ fontWeight: 600, fontFamily: 'var(--font-sans)' }}
      >
        {post.title}
      </h3>

      <p
        className="text-[14px] leading-[1.6] text-[var(--secondary-500)] mb-4 line-clamp-3"
        style={{ fontWeight: 300 }}
      >
        {post.excerpt}
      </p>

      <span
        className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.15em] text-[var(--color-accent-text)] group-hover:gap-3 transition-all duration-300"
        style={{ fontWeight: 600 }}
      >
        Leia mais
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
      </span>

      {post.tags && (
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[var(--neutral-300)]">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-[0.1em] text-[var(--secondary-900)] bg-[var(--primary-50)] px-2.5 py-1"
              style={{ fontWeight: 600 }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
