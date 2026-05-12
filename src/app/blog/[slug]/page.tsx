import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/server/blogService';
import { LinkButton } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post não encontrado' };

  return {
    title: `${post.title} | Blog UNUS`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.mainImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      
      {/* Editorial Header (Inspirado em WealthOps) */}
      <header className="pt-32 pb-20 bg-[var(--secondary-50)] border-b border-[var(--secondary-100)]">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--neutral-400)] hover:text-[var(--gold)] transition-colors mb-12 font-bold"
          >
            <ArrowLeft className="w-3 h-3" />
            Voltar ao Blog
          </Link>

          <div className="flex items-center gap-6 mb-8">
            <span className="text-[var(--gold)] text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-white border border-[var(--gold)]/20 rounded-sm">
              Mercado
            </span>
            <div className="flex items-center gap-2 text-[var(--neutral-400)] text-[12px] uppercase tracking-widest font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-[var(--neutral-400)] text-[12px] uppercase tracking-widest font-medium">
              <Clock className="w-3.5 h-3.5" />
              5 min de leitura
            </div>
          </div>

          <h1 
            className="text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] text-[var(--secondary-900)] mb-10"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            {post.title}
          </h1>

          <p className="text-[20px] sm:text-[24px] text-[var(--neutral-500)] font-light leading-relaxed max-w-[800px]">
            {post.summary}
          </p>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Article Body (Inspirado em WealthOps) */}
          <div className="lg:col-span-8">
            
            {/* Main Featured Image */}
            <div className="relative aspect-[21/10] w-full mb-20 overflow-hidden rounded-sm shadow-xl">
              {post.mainImage && (
                <Image 
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Key Takeaways Section */}
            <div className="bg-[var(--secondary-50)] border-l-4 border-[var(--gold)] p-10 mb-16 rounded-r-sm">
              <h4 className="text-[13px] uppercase tracking-[0.2em] text-[var(--secondary-900)] font-bold mb-6">Neste artigo você verá:</h4>
              <ul className="space-y-4">
                {[
                  'Análise detalhada do cenário atual',
                  'Impactos diretos no valor do m²',
                  'Oportunidades estratégicas para investidores',
                  'Visão de futuro para o mercado catarinense'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[16px] text-[var(--neutral-600)] font-light">
                    <ChevronRight className="w-4 h-4 text-[var(--gold)] shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Markdown Content */}
            <article className="prose prose-lg max-w-none 
              prose-headings:font-serif prose-headings:font-light prose-headings:text-[var(--secondary-900)] prose-headings:tracking-tight
              prose-p:text-[var(--neutral-600)] prose-p:font-light prose-p:leading-[1.8] prose-p:text-[18px]
              prose-strong:text-[var(--secondary-900)] prose-strong:font-semibold
              prose-blockquote:border-[var(--gold)] prose-blockquote:bg-[var(--secondary-50)] prose-blockquote:py-6 prose-blockquote:px-10 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[22px] prose-blockquote:text-[var(--secondary-900)]
              prose-img:rounded-sm prose-img:shadow-lg prose-img:my-16
              prose-li:text-[var(--neutral-600)] prose-li:font-light
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Post Footer / Share */}
            <footer className="mt-20 pt-12 border-t border-[var(--neutral-100)] flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 border border-[var(--neutral-200)] rounded-full text-[12px] uppercase tracking-widest font-bold hover:bg-[var(--secondary-900)] hover:text-white transition-all group">
                  <Share2 className="w-3.5 h-3.5" /> Compartilhar
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-[var(--neutral-200)] rounded-full text-[12px] uppercase tracking-widest font-bold hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all group">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </button>
              </div>
              <p className="text-[13px] text-[var(--neutral-400)] italic font-light">
                Publicado originalmente por Equipe UNUS Marketing
              </p>
            </footer>
          </div>

          {/* Sidebar CTA (Inspirado em Sophia Pro) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              
              <div className="p-10 bg-[var(--secondary-900)] text-white rounded-sm relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <span className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Consultoria Premium</span>
                  <h3 className="text-[24px] font-serif mb-6 leading-tight">Quer investir com estratégia?</h3>
                  <p className="text-white/60 text-[15px] mb-10 font-light leading-relaxed">
                    Nossos especialistas em alto padrão estão prontos para guiar sua próxima aquisição com dados reais de valorização.
                  </p>
                  <LinkButton href="/contato" variant="gold" className="w-full h-14 text-[11px] uppercase tracking-[0.2em] font-bold shadow-lg">
                    Falar com especialista
                  </LinkButton>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10" />
              </div>

              <div className="p-10 border border-[var(--neutral-100)] rounded-sm bg-white">
                <h4 className="text-[13px] uppercase tracking-[0.2em] text-[var(--secondary-900)] font-bold mb-8">Artigos Relacionados</h4>
                <div className="space-y-10">
                  {/* Mock related posts based on current slug */}
                  {[1, 2].map((_, i) => (
                    <div key={i} className="group cursor-pointer">
                      <span className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-widest mb-2 block">Mercado</span>
                      <h5 className="text-[16px] leading-snug text-[var(--secondary-900)] group-hover:text-[var(--gold)] transition-colors font-medium mb-3">
                        As tendências que estão moldando o futuro do litoral catarinense
                      </h5>
                      <span className="text-[11px] text-[var(--neutral-400)] uppercase tracking-widest">Maio, 2026</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
