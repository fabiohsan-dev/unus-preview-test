import type { Metadata } from 'next';
import { ArrowRight, BookOpen, TrendingUp, MapPin, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { whatsappUrl, SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog | UNUS Núcleo Imobiliário',
  description:
    'Inteligência de mercado, tendências e insights imobiliários em Balneário Camboriú, Itapema e Santa Catarina.',
  alternates: { canonical: `${SITE_URL}/blog` },
  robots: { index: false, follow: true },
};

const TEMAS = [
  {
    Icon: TrendingUp,
    title: 'Mercado imobiliário',
    desc: 'Análises de preço, valorização por bairro e tendências de Santa Catarina.',
  },
  {
    Icon: MapPin,
    title: 'Guias de bairro',
    desc: 'Infraestrutura, lifestyle e índice de liquidez por região.',
  },
  {
    Icon: BarChart2,
    title: 'Inteligência de dados',
    desc: 'Indicadores de demanda, sazonalidade e oportunidades de investimento.',
  },
  {
    Icon: BookOpen,
    title: 'Guias práticos',
    desc: 'Documentação, financiamento, impostos e tudo que envolve a compra segura.',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[var(--secondary-900)] pt-48 pb-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-[1px] bg-[var(--gold)]" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]/75"
              style={{ fontWeight: 600 }}
            >
              Em breve
            </span>
          </div>

          <h1
            className="text-[52px] sm:text-[68px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] text-white mb-8 max-w-[800px]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Inteligência{' '}
            <span style={{ fontWeight: 600 }} className="italic text-[var(--gold)]">
              imobiliária.
            </span>
          </h1>

          <p
            className="text-white/50 text-[16px] sm:text-[18px] max-w-[520px] leading-[1.8]"
            style={{ fontWeight: 300 }}
          >
            Análises de mercado, guias de bairro e dados que transformam decisões
            imobiliárias em Santa Catarina. Em preparação.
          </p>
        </div>
      </section>

      {/* ── O que vem aí ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-24 lg:py-32 border-b border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
              <span
                className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
                style={{ fontWeight: 600 }}
              >
                Conteúdo
              </span>
            </div>
            <h2
              className="text-[32px] sm:text-[40px] text-[var(--color-heading)] leading-[1.2]"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              O que vamos publicar.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-[var(--neutral-100)]">
            {TEMAS.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className={`flex gap-6 py-10 md:px-12 first:md:pl-0 ${
                  i < 2 ? 'border-b border-[var(--neutral-100)]' : ''
                } ${i % 2 === 0 ? 'md:pr-12' : ''}`}
              >
                <div className="w-10 h-10 border border-[var(--neutral-200)] flex items-center justify-center shrink-0 mt-1">
                  <Icon className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="text-[18px] text-[var(--color-heading)] mb-2 leading-[1.3]"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[14px] text-[var(--color-body)] leading-[1.8]"
                    style={{ fontWeight: 300 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Notificação via WhatsApp ── */}
      <section className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
                  style={{ fontWeight: 600 }}
                >
                  Fique por dentro
                </span>
              </div>

              <h2
                className="text-[32px] sm:text-[40px] text-[var(--color-heading)] leading-[1.2] mb-6"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Seja o primeiro a saber quando publicarmos.
              </h2>

              <p
                className="text-[15px] text-[var(--color-body)] leading-[1.85] mb-10 max-w-[460px]"
                style={{ fontWeight: 300 }}
              >
                Fale com a nossa equipa pelo WhatsApp e avise que quer receber
                as novidades do blog assim que publicarmos.
              </p>

              <a
                href={whatsappUrl('Olá! Quero ser avisado quando o blog da UNUS entrar no ar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[var(--secondary-900)] text-white
                  text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                  hover:bg-[var(--secondary-800)] transition-colors group"
              >
                Quero ser avisado
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </a>
            </div>

            {/* Lado direito — CTA para imóveis */}
            <div className="border border-[var(--neutral-200)] p-10 lg:p-12">
              <div className="w-8 h-[1px] bg-[var(--gold)] mb-8" />
              <h3
                className="text-[24px] text-[var(--color-heading)] mb-4 leading-[1.3]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Enquanto isso, explore a nossa curadoria de imóveis.
              </h3>
              <p
                className="text-[14px] text-[var(--color-body)] leading-[1.8] mb-8"
                style={{ fontWeight: 300 }}
              >
                Alto padrão em Balneário Camboriú, Itapema e região —
                selecionados com inteligência de mercado.
              </p>
              <Link
                href="/venda"
                className="inline-flex items-center gap-3
                  text-[11px] uppercase tracking-[0.2em]
                  border-b border-[var(--secondary-900)]/30 hover:border-[var(--secondary-900)]
                  pb-0.5 transition-colors group"
                style={{ fontWeight: 600 }}
              >
                Ver imóveis disponíveis
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
