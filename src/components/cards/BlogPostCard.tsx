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

      <span className="text-text-xs font-medium uppercase tracking-[var(--tracking-micro)] text-[var(--champagne-readable)] mb-3 block">
        {post.date}
      </span>

      <h3 className="text-lg font-semibold leading-snug text-[var(--deep-blue)] mb-3 group-hover:text-[var(--champagne-readable)] transition-colors duration-300">
        {post.title}
      </h3>

      <p className="text-sm font-light leading-relaxed text-[var(--graphite)] mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      <span className="inline-flex items-center gap-1.5 text-text-xs font-semibold uppercase tracking-[var(--tracking-button)] text-[var(--deep-blue)] group-hover:text-[var(--champagne-readable)] group-hover:gap-3 transition-all duration-300">
        Leia mais
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
      </span>

      {post.tags && (
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[var(--champagne)]/20">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-text-micro font-semibold uppercase tracking-[var(--tracking-micro)] text-[var(--deep-blue)] bg-[var(--champagne-soft)]/35 border border-[var(--champagne)]/25 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
