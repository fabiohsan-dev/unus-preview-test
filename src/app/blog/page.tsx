import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Search, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/server/blogService';

export const metadata: Metadata = {
  title: 'Blog | UNUS Núcleo Imobiliário',
  description: 'Análises de mercado, guias de bairro e dados que transformam decisões imobiliárias em Santa Catarina.',
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Breadcrumb / Top Title */}
        <div className="mb-12 text-center max-w-[800px] mx-auto">
           <span className="text-[var(--gold)] text-[12px] uppercase tracking-[0.3em] font-bold mb-4 block">Insights & Inteligência</span>
           <h1 
             className="text-[48px] sm:text-[64px] lg:text-[84px] leading-[1.05] tracking-[-0.04em] text-[var(--secondary-900)] mb-8"
             style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
           >
             Artigos & <span className="italic">Guias.</span>
           </h1>
           <div className="w-12 h-[1px] bg-[var(--neutral-200)] mx-auto mb-8" />
           <p className="text-[var(--neutral-500)] text-[18px] font-light leading-relaxed">
             Fique por dentro das últimas tendências, dicas de especialistas e atualizações do mercado imobiliário catarinense.
           </p>
        </div>

        {/* Featured Post - Layout Split (Inspirado em WealthOps/Sophia) */}
        {featuredPost && (
          <section className="mb-32">
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[var(--secondary-50)] overflow-hidden rounded-sm border border-[var(--secondary-100)]">
              <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto overflow-hidden">
                {featuredPost.mainImage ? (
                  <Image 
                    src={featuredPost.mainImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--secondary-100)]" />
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="lg:col-span-4 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white lg:-ml-20 lg:my-16 lg:shadow-2xl z-10 relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[var(--gold)]/10 text-[var(--gold)] text-[10px] uppercase tracking-widest px-3 py-1 font-bold">Destaque</span>
                  <span className="text-[11px] text-[var(--neutral-400)] uppercase tracking-widest">{new Date(featuredPost.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                </div>
                
                <h2 className="text-[32px] leading-tight text-[var(--secondary-900)] mb-6 font-serif font-light tracking-tight">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-[var(--gold)] transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>
                
                <p className="text-[var(--neutral-500)] text-[16px] font-light leading-relaxed mb-10 line-clamp-4">
                  {featuredPost.summary}
                </p>
                
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--secondary-900)] hover:gap-5 transition-all"
                >
                  Continuar leitura <ArrowRight className="w-4 h-4 text-[var(--gold)]" />
                </Link>
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-24">
            {remainingPosts.map((post) => (
              <article key={post.slug} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--secondary-50)] shadow-sm">
                  {post.mainImage ? (
                    <Image 
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--neutral-300)]">UNUS</div>
                  )}
                </Link>
                
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[var(--gold)] text-[11px] font-bold uppercase tracking-widest">Mercado</span>
                    <div className="w-1 h-1 rounded-full bg-[var(--neutral-200)]" />
                    <span className="text-[var(--neutral-400)] text-[11px] uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  
                  <h3 className="text-[26px] leading-tight text-[var(--secondary-900)] mb-4 font-serif font-light group-hover:text-[var(--gold)] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-[var(--neutral-500)] text-[15px] font-light leading-relaxed mb-8 line-clamp-3">
                    {post.summary}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--secondary-900)]"
                  >
                    Ler mais <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar (Inspirado em Sophia Pro) */}
          <aside className="lg:col-span-4 space-y-16">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neutral-400)]" />
              <input 
                type="text"
                placeholder="Pesquisar..."
                className="w-full px-6 py-4 bg-white border border-[var(--neutral-100)] rounded-sm text-[14px] outline-none focus:border-[var(--secondary-900)] transition-all"
              />
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[13px] uppercase tracking-[0.2em] text-[var(--secondary-900)] font-bold mb-8 flex items-center gap-3">
                Categorias
                <div className="flex-grow h-[1px] bg-[var(--neutral-100)]" />
              </h4>
              <ul className="space-y-4">
                {['Mercado Imobiliário', 'Guias de Bairro', 'Dicas de Venda', 'Arquitetura & Design', 'Investimento'].map((cat) => (
                  <li key={cat}>
                    <Link href="#" className="flex justify-between items-center text-[14px] text-[var(--neutral-600)] hover:text-[var(--gold)] transition-colors group">
                      {cat}
                      <span className="text-[10px] text-[var(--neutral-300)] group-hover:text-[var(--gold)] font-medium">05</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter / CTA */}
            <div className="p-10 bg-[var(--secondary-900)] text-white rounded-sm relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-[20px] font-serif mb-4">Relatórios Exclusivos</h4>
                <p className="text-white/60 text-[14px] mb-8 font-light leading-relaxed">
                  Receba mensalmente nossa curadoria com dados de valorização e oportunidades fora do mercado.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-[13px] outline-none focus:border-white/30 transition-all"
                  />
                  <button className="w-full bg-[var(--gold)] text-[var(--neutral-900)] text-[11px] uppercase tracking-widest font-bold py-4 hover:brightness-110 transition-all">
                    Inscrever-se
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>

            {/* Popular Posts Mini */}
            <div>
              <h4 className="text-[13px] uppercase tracking-[0.2em] text-[var(--secondary-900)] font-bold mb-8 flex items-center gap-3">
                Mais Lidos
                <div className="flex-grow h-[1px] bg-[var(--neutral-100)]" />
              </h4>
              <div className="space-y-8">
                {allPosts.slice(0, 3).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-4 group">
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-[var(--secondary-50)]">
                      {post.mainImage && <Image src={post.mainImage} alt={post.title} fill className="object-cover" />}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h5 className="text-[14px] leading-snug text-[var(--secondary-900)] group-hover:text-[var(--gold)] transition-colors line-clamp-2 font-medium">
                        {post.title}
                      </h5>
                      <span className="text-[10px] text-[var(--neutral-400)] uppercase tracking-widest mt-2">{new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}
