import type { Metadata } from 'next';
import { Building2, Camera, TrendingUp, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl, WA_DEFAULT, SITE_URL } from '@/lib/constants';
import { AnuncieForm } from './AnuncieForm';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Anuncie seu Imóvel | UNUS Núcleo Imobiliário',
  description:
    'Anuncie seu imóvel com inteligência de mercado. Visita técnica personalizada, estratégia de marketing de alto padrão e consultoria especializada em Balneário Camboriú e Itapema.',
  alternates: { canonical: `${SITE_URL}/anuncie` },
  openGraph: {
    title: 'Anuncie seu Imóvel | UNUS Núcleo Imobiliário',
    description:
      'Anuncie seu imóvel com inteligência de mercado. Visita técnica personalizada e estratégia de marketing de alto padrão.',
    url: `${SITE_URL}/anuncie`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'UNUS — Anuncie seu Imóvel' }],
  },
};

const STEPS = [
  {
    num: '01',
    icon: Building2,
    title: 'Preenchimento',
    desc:
      'Preencha o formulário com as informações iniciais do seu imóvel. Simples, rápido e sem burocracia.',
  },
  {
    num: '02',
    icon: Camera,
    title: 'Visita Técnica',
    desc:
      'Um consultor UNUS agenda uma visita ao seu imóvel para avaliação técnica e registro de alta qualidade.',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Estratégia de Marketing',
    desc:
      'Lançamos seu imóvel com inteligência de mercado: curadoria visual, alcance qualificado e posicionamento estratégico.',
  },
];

export default function AnunciePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[var(--secondary-900)] pt-48 pb-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* textura sutil */}
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
              Anuncie seu Imóvel
            </span>
          </div>

          <h1
            className="text-[52px] sm:text-[68px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] text-white mb-8 max-w-[760px]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Seu imóvel no{' '}
            <span style={{ fontWeight: 600 }} className="italic text-[var(--gold)]">
              mercado certo.
            </span>
          </h1>

          <p
            className="text-white/50 text-[16px] sm:text-[18px] max-w-[520px] leading-[1.8]"
            style={{ fontWeight: 300 }}
          >
            Combinamos consultoria personalizada, visita técnica e estratégia de
            marketing de alto padrão para valorizar e posicionar o seu patrimônio.
          </p>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-24 lg:py-32 border-b border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
            <h2
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-heading)]"
              style={{ fontWeight: 600 }}
            >
              Como funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative">
                  {/* linha conectora */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(100%+16px)] right-0 h-[1px] w-[calc(100%-32px)] bg-[var(--neutral-200)]" />
                  )}

                  <div className="flex items-start gap-5 mb-6">
                    <span
                      className="text-[11px] tracking-[0.2em] text-[var(--gold)] shrink-0 mt-1"
                      style={{ fontWeight: 600 }}
                    >
                      {step.num}
                    </span>
                    <div className="w-12 h-12 border border-[var(--neutral-200)] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[var(--color-heading)]" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3
                    className="text-[22px] text-[var(--color-heading)] mb-4 leading-[1.2]"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[14px] text-[var(--color-body)] leading-[1.8]"
                    style={{ fontWeight: 300 }}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Formulário + Sidebar ── */}
      <main
        className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32"
        id="formulario"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-20 lg:gap-24 items-start">

            {/* ── Esquerda — Formulário ── */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                <h2
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-heading)]"
                  style={{ fontWeight: 600 }}
                >
                  Dados do imóvel
                </h2>
              </div>

              <p
                className="text-[16px] text-[var(--color-body)] leading-[1.8] mb-12 max-w-[480px]"
                style={{ fontWeight: 300 }}
              >
                Preencha o formulário abaixo. Nossa equipe entrará em contato em
                até 24 horas para dar início ao processo.
              </p>

              <AnuncieForm />
            </div>

            {/* ── Direita — Cards de apoio ── */}
            <div className="space-y-4 lg:sticky lg:top-32">

              {/* Diferenciais */}
              <div className="p-10 bg-[var(--secondary-900)] text-white">
                <p
                  className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/75 mb-8"
                  style={{ fontWeight: 600 }}
                >
                  Por que a UNUS?
                </p>

                <ul className="space-y-6">
                  {[
                    {
                      title: 'Curadoria visual',
                      desc: 'Fotografia profissional e tour virtual para o seu imóvel.',
                    },
                    {
                      title: 'Inteligência de preço',
                      desc: 'Posicionamento baseado em dados reais do mercado local.',
                    },
                    {
                      title: 'Alcance qualificado',
                      desc: 'Rede de compradores e investidores ativos na região.',
                    },
                    {
                      title: 'Consultoria humana',
                      desc: 'Acompanhamento próximo em cada etapa da negociação.',
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4 items-start">
                      <div className="w-1 h-1 rounded-full bg-[var(--gold)] mt-2.5 shrink-0" />
                      <div>
                        <p
                          className="text-[13px] text-white mb-1"
                          style={{ fontWeight: 600 }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-[13px] text-white/50 leading-[1.7]"
                          style={{ fontWeight: 300 }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <a
                    href={whatsappUrl('Olá! Quero saber mais sobre anunciar meu imóvel pela UNUS.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white
                      border-b border-white/20 hover:border-white pb-0.5 transition-colors group"
                    style={{ fontWeight: 600 }}
                  >
                    Falar com um consultor
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </div>

              {/* CTA — Procurando imóvel */}
              <Link
                href="/venda"
                className="group block p-8 border border-[var(--neutral-200)] bg-white
                  hover:border-[var(--secondary-900)] transition-colors duration-300"
              >
                <MessageCircle
                  className="w-6 h-6 text-[var(--color-heading)] mb-6"
                  strokeWidth={1.5}
                />
                <h3
                  className="text-[22px] mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                >
                  Procurando um imóvel?
                </h3>
                <p
                  className="text-[13px] text-[var(--color-body)] mb-7 leading-[1.75]"
                  style={{ fontWeight: 300 }}
                >
                  Explore nossa curadoria de imóveis de alto padrão em Balneário
                  Camboriú, Itapema e região.
                </p>
                <div
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"
                  style={{ fontWeight: 600 }}
                >
                  Ver imóveis disponíveis
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>

              {/* Contato direto */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={PHONE_HREF}
                  className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    Telefone
                  </p>
                  <p
                    className="text-[13px] text-[var(--color-heading)] flex items-center gap-1.5"
                    style={{ fontWeight: 600 }}
                  >
                    {PHONE_DISPLAY}
                  </p>
                </a>
                <Link
                  href="/contato"
                  className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    Outros contatos
                  </p>
                  <p
                    className="text-[13px] text-[var(--color-heading)] flex items-center gap-1.5"
                    style={{ fontWeight: 600 }}
                  >
                    Fale conosco
                    <ArrowRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      strokeWidth={1.5}
                    />
                  </p>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
