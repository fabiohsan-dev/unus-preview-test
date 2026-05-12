import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { getAllPosts } from '@/lib/server/blogService';

export const metadata: Metadata = {
  title: 'Blog | UNUS Núcleo Imobiliário',
  description: 'Análises de mercado, guias de bairro e dados que transformam decisões imobiliárias em Santa Catarina.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header do Blog */}
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 
              className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.03em] text-[var(--secondary-900)] mb-6"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              Inteligência <span style={{ fontWeight: 600 }}>Imobiliária.</span>
            </h1>
            <p className="text-[var(--neutral-500)] text-[18px] max-w-[600px] font-light leading-relaxed">
              Onde dados e curadoria se encontram para guiar seus melhores investimentos.
            </p>
          </div>
          
          <div className="relative w-full max-w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neutral-400)]" />
            <input 
              type="text"
              placeholder="Pesquisar artigos..."
              className="w-full pl-12 pr-4 py-4 bg-[var(--secondary-50)] border-none rounded-full text-[14px] outline-none focus:ring-1 focus:ring-[var(--secondary-900)] transition-all"
            />
          </div>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col h-full border-b border-[var(--neutral-100)] pb-10">
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] mb-8 overflow-hidden bg-[var(--secondary-50)]">
                {post.mainImage ? (
                  <Image 
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--neutral-300)]">
                    UNUS Blog
                  </div>
                )}
              </Link>

              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[var(--neutral-400)] font-medium">
                  <Calendar className="w-3 h-3" />
                  Atualizado Recentemente
                </span>
                <div className="w-1 h-1 rounded-full bg-[var(--neutral-300)]" />
                <span className="text-[11px] uppercase tracking-wider text-[var(--gold)] font-bold">
                  Mercado
                </span>
              </div>

              <h2 
                className="text-[24px] leading-tight text-[var(--secondary-900)] mb-4 group-hover:text-[var(--gold)] transition-colors line-clamp-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-[var(--neutral-500)] text-[15px] font-light leading-relaxed line-clamp-3 mb-8 flex-grow">
                {post.summary}
              </p>

              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--secondary-900)] hover:gap-3 transition-all"
              >
                Ler artigo <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--neutral-500)] italic">Nenhum artigo encontrado no momento.</p>
          </div>
        )}

      </div>
    </main>
  );
}
