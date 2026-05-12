import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2, MessageCircle } from 'lucide-react';
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
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <article className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Breadcrumb / Voltar */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[var(--neutral-400)] hover:text-[var(--secondary-900)] transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para o Blog
        </Link>

        {/* Header do Post */}
        <header className="max-w-[900px] mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] font-bold">
              Mercado Imobiliário
            </span>
            <div className="w-1 h-1 rounded-full bg-[var(--neutral-200)]" />
            <span className="text-[11px] uppercase tracking-wider text-[var(--neutral-400)]">
              Leitura de 5 min
            </span>
          </div>

          <h1 
            className="text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.1] tracking-[-0.02em] text-[var(--secondary-900)] mb-8"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            {post.title}
          </h1>

          <p className="text-[18px] sm:text-[21px] text-[var(--neutral-500)] font-light leading-relaxed border-l-2 border-[var(--gold)] pl-8">
            {post.summary}
          </p>
        </header>

        {/* Imagem Principal */}
        <div className="relative aspect-[21/9] w-full mb-20 overflow-hidden bg-[var(--secondary-50)]">
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

        {/* Conteúdo do Artigo */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20">
          
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:text-[var(--secondary-900)] prose-p:text-[var(--neutral-600)] prose-p:font-light prose-p:leading-relaxed prose-strong:text-[var(--secondary-900)] prose-strong:font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Sidebar / CTA */}
          <aside className="space-y-12">
            <div className="p-8 bg-[var(--secondary-50)] border border-[var(--secondary-100)] sticky top-32">
              <h3 className="text-[18px] font-serif text-[var(--secondary-900)] mb-4">Interessado neste tema?</h3>
              <p className="text-[14px] text-[var(--neutral-500)] mb-8 leading-relaxed">
                Nossos consultores possuem dados exclusivos sobre valorização imobiliária em Santa Catarina.
              </p>
              <LinkButton href="/contato" className="w-full h-12 text-[11px] uppercase tracking-widest font-bold">
                Falar com especialista
              </LinkButton>
              
              <div className="mt-8 pt-8 border-t border-[var(--secondary-200)]/50 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[var(--neutral-400)] font-medium">Compartilhar</span>
                <div className="flex gap-4">
                  <button className="text-[var(--secondary-900)] hover:text-[var(--gold)] transition-colors"><Share2 className="w-4 h-4" /></button>
                  <button className="text-[var(--secondary-900)] hover:text-[var(--gold)] transition-colors"><MessageCircle className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </aside>

        </div>

      </article>
    </main>
  );
}
