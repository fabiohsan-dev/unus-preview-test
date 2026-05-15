import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPostCard, type BlogPostCardData } from '@/components/cards/BlogPostCard';

const posts: BlogPostCardData[] = [
  {
    id: 1,
    date: '30 de janeiro de 2026',
    title: 'O que está valorizando os imóveis em Florianópolis e São José em 2026?',
    excerpt:
      'Florianópolis e São José encerraram 2025 entre os mercados imobiliários mais valorizados do país, com crescimento acima da média nacional. A combinação de demanda qualificada, escassez de oferta e foco em alto padrão mantém a valorização consistente e reforça um cenário positivo para 2026.',
    image:
      'https://images.unsplash.com/photo-1681157864613-f1a667b4b225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGbG9yaWFub3BvbGlzJTIwYWVyaWFsJTIwY29hc3RhbCUyMGNpdHl8ZW58MXx8fHwxNzc1NDkxNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['investimento', 'mercado imobiliário', 'São José'],
    href: '/blog',
  },
  {
    id: 2,
    date: '6 de maio de 2024',
    title: 'Campinas, São José: a evolução urbana',
    excerpt:
      'O bairro Campinas está em constante crescimento e segue como destaque no investimento imobiliário da Grande Florianópolis.',
    image:
      'https://images.unsplash.com/photo-1768060689238-f580dbcae732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1cmJhbiUyMHNreWxpbmUlMjBCcmF6aWx8ZW58MXx8fHwxNzc1MTU1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    href: '/blog',
  },
  {
    id: 3,
    date: '9 de outubro de 2023',
    title: 'O poder do marketing na venda do seu imóvel',
    excerpt:
      'O marketing desempenha um papel crucial no sucesso da venda de um imóvel de alto padrão e amplia a percepção de valor.',
    image:
      'https://images.unsplash.com/photo-1763479169474-728a7de108c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwbWFya2V0aW5nJTIwbHV4dXJ5JTIwaG9tZXxlbnwxfHx8fDE3NzU0OTE2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    href: '/blog',
  },
  {
    id: 4,
    date: '19 de julho de 2023',
    title: 'Facilidades de morar nas regiões de Campinas e Kobrasol',
    excerpt:
      'Um estilo de vida equilibrado entre a dinâmica urbana e a proximidade com o mar continua atraindo compradores exigentes.',
    image:
      'https://images.unsplash.com/photo-1768337278478-b42763837c22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwY2l0eSUyMGJlYWNoJTIwbGl2aW5nJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc3NTQ5MTY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    href: '/blog',
  },
];

export function BlogSection() {
  return (
    <section className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--neutral-50)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--primary-500)]" />
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent-text)]"
              style={{ fontWeight: 600 }}
            >
              Inteligência Imobiliária
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]"
              style={{ fontWeight: 300 }}
            >
              Insights do <span style={{ fontWeight: 600 }}>mercado</span>
            </h2>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[var(--secondary-900)] hover:text-[var(--color-accent-text)] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Ver todos os artigos
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
