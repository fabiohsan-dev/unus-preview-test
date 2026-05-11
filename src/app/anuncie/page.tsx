import type { Metadata } from 'next';
import { ClipboardList, Home, TrendingUp, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl, SITE_URL } from '@/lib/constants';
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
    Icon: ClipboardList,
    title: 'Preencha o formulário',
    desc: 'Cadastre-se com os seus dados e aguarde que um dos nossos consultores especialistas lhe atenderá.',
  },
  {
    num: '02',
    Icon: Home,
    title: 'Conhecendo o imóvel',
    desc: 'Após contato do nosso consultor imobiliário, buscaremos conhecer melhor seu imóvel visitando-o.',
  },
  {
    num: '03',
    Icon: TrendingUp,
    title: 'Anunciando com estratégia',
    desc: 'Trabalhamos com profissionais de marketing com experiência em ações de inteligência de mercado!',
  },
];

export default function AnunciePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[var(--secondary-900)] pt-48 pb-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* textura */}
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
            Consultoria personalizada, visita técnica e estratégia de marketing
            de alto padrão para valorizar e posicionar o seu patrimônio.
          </p>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-24 lg:py-32 border-b border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">

          {/* Cabeçalho da seção */}
          <div className="mb-16 lg:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
              <span
                className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
                style={{ fontWeight: 600 }}
              >
                Como funciona
              </span>
            </div>
            <h2
              className="text-[32px] sm:text-[40px] text-[var(--color-heading)] leading-[1.2]"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              Entenda o nosso processo.
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-[var(--neutral-100)]">
            {STEPS.map(({ num, Icon, title, desc }) => (
              <div key={num} className="flex flex-col gap-6 py-8 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-[var(--neutral-100)] last:border-b-0">
                {/* Número + ícone */}
                <div className="flex items-center gap-4">
                  <span
                    className="text-[13px] text-[var(--gold)] tabular-nums"
                    style={{ fontWeight: 600, letterSpacing: '0.1em' }}
                  >
                    {num}
                  </span>
                  <div className="w-11 h-11 border border-[var(--neutral-200)] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[var(--color-heading)]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Texto */}
                <div>
                  <h3
                    className="text-[20px] text-[var(--color-heading)] mb-3 leading-[1.25]"
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

      {/* ── Formulário + Sidebar ── */}
      <main
        className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32"
        id="formulario"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-20 lg:gap-24 items-start">

            {/* ── Esquerda — Formulário ── */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-heading)]"
                  style={{ fontWeight: 600 }}
                >
                  Dados do imóvel
                </span>
              </div>

              <p
                className="text-[16px] text-[var(--color-body)] leading-[1.8] mb-12 max-w-[460px]"
                style={{ fontWeight: 300 }}
              >
                Preencha o formulário abaixo. Nossa equipe entrará em contato em
                até 24 horas úteis para dar início ao processo.
              </p>

              <AnuncieForm />
            </div>

            {/* ── Direita ── */}
            <div className="space-y-4 lg:sticky lg:top-32">

              {/* CTA WhatsApp direto */}
              <a
                href={whatsappUrl('Olá! Gostaria de anunciar meu imóvel pela UNUS. Podem me ajudar?')}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-10 bg-[var(--secondary-900)] text-white
                  hover:bg-[var(--secondary-800)] transition-colors duration-300"
              >
                <MessageCircle className="w-7 h-7 text-[var(--gold)] mb-8" strokeWidth={1.5} />
                <h3
                  className="text-[26px] mb-3 text-white leading-tight"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                >
                  Prefere conversar antes?
                </h3>
                <p
                  className="text-white/50 text-[14px] mb-10 leading-[1.75]"
                  style={{ fontWeight: 300 }}
                >
                  Fale diretamente com um de nossos consultores pelo WhatsApp.
                  Atendimento personalizado, sem compromisso.
                </p>
                <div
                  className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
                  style={{ fontWeight: 600 }}
                >
                  Abrir WhatsApp
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                    strokeWidth={1.5}
                  />
                </div>
              </a>

              {/* CTA — Procurando imóvel */}
              <Link
                href="/venda"
                className="group block p-8 border border-[var(--neutral-200)] bg-white
                  hover:border-[var(--secondary-900)] transition-colors duration-300"
              >
                <h3
                  className="text-[20px] mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                >
                  Procurando um imóvel?
                </h3>
                <p
                  className="text-[13px] text-[var(--color-body)] mb-6 leading-[1.75]"
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
                  <Phone className="w-4 h-4 text-[var(--color-caption)] mb-3" strokeWidth={1.5} />
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-1"
                    style={{ fontWeight: 500 }}
                  >
                    Telefone
                  </p>
                  <p
                    className="text-[13px] text-[var(--color-heading)]"
                    style={{ fontWeight: 600 }}
                  >
                    {PHONE_DISPLAY}
                  </p>
                </a>
                <Link
                  href="/contato"
                  className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--color-caption)] mb-3" strokeWidth={1.5} />
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-1"
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
