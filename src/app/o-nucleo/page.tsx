import type { Metadata } from 'next';
import {
  Network,
  Users,
  Heart,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { whatsappUrl, SITE_URL } from '@/lib/constants';
import { OfficeSlider } from '@/components/OfficeSlider';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'O Núcleo | UNUS Núcleo Imobiliário',
  description:
    'Conheça a UNUS Núcleo Imobiliário: mais de 9 anos de história, 464 famílias realizadas e 17 anos de experiência combinada no mercado imobiliário de Santa Catarina.',
  alternates: { canonical: `${SITE_URL}/o-nucleo` },
  openGraph: {
    title: 'O Núcleo | UNUS Núcleo Imobiliário',
    description:
      'Conheça a UNUS Núcleo Imobiliário: mais de 9 anos de história, 464 famílias realizadas e 17 anos de experiência no mercado imobiliário.',
    url: `${SITE_URL}/o-nucleo`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'UNUS — O Núcleo' }],
  },
};

/* ─────────── dados ─────────── */

const STATS = [
  { num: '17+',    unit: 'anos',    label: 'de experiência no\nmercado imobiliário' },
  { num: '9½',     unit: 'anos',    label: 'de história\nUNUS' },
  { num: '464',    unit: 'famílias', label: 'e investidores\nrealizados' },
  { num: '56.016', unit: 'm²',      label: 'comercializados' },
] as const;

const DIFERENCIAIS = [
  {
    num: '01',
    Icon: Network,
    title: 'Imobiliária dentro de um Núcleo',
    desc: 'Profissionais e empresas de serviços afiliados ao Núcleo, como arquitetos, móveis sob medida, gesso, box e fechamento de sacada, pintura e reforma, etc, para os nossos clientes no pós-venda.',
    extras: [] as string[],
  },
  {
    num: '02',
    Icon: Users,
    title: 'Corretores qualificados',
    desc: 'Contemos Consultores Imobiliários capacitados em todo o processo de sua aquisição, da primeira visita até a entrega das chaves!',
    extras: [] as string[],
  },
  {
    num: '03',
    Icon: Heart,
    title: 'Trabalhamos com atendimento personalizado',
    desc: 'Do primeiro contato até a assinatura do contrato, o cliente vai sentir uma grande diferença na maneira como conduzimos as coisas, pois um bom atendimento é o que nos move!',
    extras: [] as string[],
  },
  {
    num: '04',
    Icon: TrendingUp,
    title: 'Investimento em marketing digital',
    desc: 'Trabalhamos com profissionais de MKT com experiência em ações de inteligência de mercado!',
    extras: [
      'Investimentos em Facebook Ads e Google Ads',
      'Presença em YouTube e principais Redes Sociais',
      'Nos melhores Portais de Vendas do mercado',
      'Vídeos e artes de postagem para anúncios diferenciados',
    ],
  },
] as const;

const MVV = [
  {
    label: 'Missão',
    text: 'Encontrar sempre os melhores imóveis de modo a facilitar a experiência para proprietários, compradores e locatários, prezando sempre pela boa instrução, prestatividade e assertividade, realizando treinamentos com a equipe para garantir a qualidade de nossos serviços.',
  },
  {
    label: 'Visão',
    text: 'Se tornar a maior imobiliária de Santa Catarina, garantindo sempre os melhores imóveis de modo a facilitar a experiência para proprietários, compradores e locatários, prezando sempre pela boa instrução, prestatividade e assertividade, realizando treinamentos com a equipe para garantir a qualidade de nossos serviços.',
  },
  {
    label: 'Valores',
    text: 'Prezamos sempre pela boa instrução, prestatividade e assertividade, realizando treinamentos com a equipe para garantir a qualidade de nossos serviços.',
  },
] as const;

const PARCEIROS_SERVICOS = [
  'Arquitetos',
  'Administração de obras',
  'Reformas',
  'Pinturas',
  'Móveis sob medida',
  'Box e sacadas',
];

/* ─────────── página ─────────── */

export default function NucleoPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero (split) ── */}
      <section className="overflow-hidden">
        <div className="lg:grid lg:grid-cols-2">

          {/* Esquerda — texto sobre fundo escuro */}
          <div className="bg-[var(--secondary-900)] relative px-6 sm:px-8 lg:px-12 xl:px-16 pt-48 pb-24">
            {/* textura */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* linha dourada embaixo (só aparece no bottom da col) */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent lg:hidden" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[var(--gold)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]/75"
                  style={{ fontWeight: 600 }}
                >
                  O Núcleo
                </span>
              </div>

              <h1
                className="text-[48px] sm:text-[64px] lg:text-[72px] leading-[1.0] tracking-[-0.025em] text-white mb-8"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                A solução perfeita em{' '}
                <span style={{ fontWeight: 600 }} className="italic text-[var(--gold)]">
                  serviços imobiliários.
                </span>
              </h1>

              <p
                className="text-white/50 text-[16px] sm:text-[18px] max-w-[480px] leading-[1.8]"
                style={{ fontWeight: 300 }}
              >
                Mais de 9 anos conectando famílias e investidores aos melhores
                imóveis de Santa Catarina com inteligência, estratégia e cuidado.
              </p>
            </div>
          </div>

          {/* Direita — fotografia */}
          <div className="relative min-h-[360px] lg:min-h-0">
            <Image
              src="/office/sala-unus-9.webp"
              alt="Sala de conferência UNUS com vista para a cidade"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* gradiente sutil à esquerda para fundir com a col de texto */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--secondary-900)] to-transparent hidden lg:block" />
            {/* overlay leve para preservar legibilidade da cor */}
            <div className="absolute inset-0 bg-[var(--secondary-900)]/15" />
          </div>

        </div>
      </section>

      {/* ── Números ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-20 border-b border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-[var(--neutral-100)]">
            {STATS.map(({ num, unit, label }) => (
              <div key={num} className="flex flex-col items-start px-8 py-8 lg:py-0 first:pl-0">
                <div className="flex items-end gap-1.5 mb-2">
                  <span
                    className="text-[52px] lg:text-[60px] leading-none text-[var(--color-heading)] tracking-[-0.03em]"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-[16px] text-[var(--gold)] mb-2"
                    style={{ fontWeight: 500 }}
                  >
                    {unit}
                  </span>
                </div>
                <p
                  className="text-[13px] text-[var(--color-body)] leading-[1.6] whitespace-pre-line"
                  style={{ fontWeight: 300 }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nossos Diferenciais ── */}
      <section className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16 lg:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
              <span
                className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
                style={{ fontWeight: 600 }}
              >
                Diferenciais
              </span>
            </div>
            <h2
              className="text-[32px] sm:text-[40px] text-[var(--color-heading)] leading-[1.2] max-w-[520px]"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              Nossos diferenciais.
            </h2>
          </div>

          {/* Layout: lista à esquerda + imagem à direita */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_500px] gap-16 lg:gap-24 items-start">

            {/* Esquerda — lista com divisores */}
            <div className="divide-y divide-[var(--neutral-100)]">
              {DIFERENCIAIS.map(({ num, Icon, title, desc, extras }) => (
                <div key={num} className="py-10 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="text-[11px] text-[var(--gold)] tracking-[0.1em]"
                      style={{ fontWeight: 600 }}
                    >
                      {num}
                    </span>
                    <div className="w-10 h-10 border border-[var(--neutral-200)] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3
                    className="text-[22px] text-[var(--color-heading)] mb-3 leading-[1.25]"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {title}
                  </h3>

                  <p
                    className="text-[14px] text-[var(--color-body)] leading-[1.85]"
                    style={{ fontWeight: 300 }}
                  >
                    {desc}
                  </p>

                  {extras.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {extras.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-[var(--gold)] mt-[3px] shrink-0"
                            strokeWidth={2}
                          />
                          <span
                            className="text-[13px] text-[var(--color-body)] leading-[1.7]"
                            style={{ fontWeight: 300 }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Direita — composição editorial (sticky) */}
            <div className="lg:sticky lg:top-32">
              <figure className="relative">

                {/* Filete dourado vertical decorativo */}
                <div className="hidden lg:block absolute -left-6 top-12 bottom-12 w-[1px] bg-[var(--gold)]/40" />

                {/* Imagem principal */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/office/sala-unus-7.webp"
                    alt="Escritório UNUS Núcleo Imobiliário em Balneário Camboriú"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary-900)]/35 via-transparent to-transparent" />

                  {/* Selo no canto superior direito — ano de fundação */}
                  <div className="absolute top-6 right-6 flex flex-col items-end">
                    <span
                      className="text-[9px] uppercase tracking-[0.4em] text-white/70 mb-1"
                      style={{ fontWeight: 600 }}
                    >
                      Est.
                    </span>
                    <span
                      className="text-[28px] text-white tabular-nums leading-none"
                      style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                    >
                      2015
                    </span>
                  </div>

                  {/* Localização no rodapé da imagem */}
                  <figcaption className="absolute left-6 right-6 bottom-5 flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-[var(--gold)]" />
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] text-white/85"
                      style={{ fontWeight: 500 }}
                    >
                      Balneário Camboriú, SC
                    </span>
                  </figcaption>
                </div>

                {/* Cartão sobreposto — assinatura editorial */}
                <div className="relative lg:absolute lg:-bottom-8 lg:-left-10 mt-6 lg:mt-0 bg-white px-7 py-7 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] max-w-[280px] z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-[1px] bg-[var(--gold)]" />
                    <span
                      className="text-[9px] uppercase tracking-[0.35em] text-[var(--gold)]"
                      style={{ fontWeight: 600 }}
                    >
                      Nossa Casa
                    </span>
                  </div>
                  <p
                    className="text-[18px] text-[var(--color-heading)] leading-[1.35]"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    Mais que um escritório,{' '}
                    <em
                      className="italic text-[var(--gold)]"
                      style={{ fontWeight: 500 }}
                    >
                      um núcleo.
                    </em>
                  </p>
                </div>

              </figure>
            </div>

          </div>

        </div>
      </section>

      {/* ── Missão / Visão / Valores ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-24 lg:py-32 border-t border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
              style={{ fontWeight: 600 }}
            >
              Propósito
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-[var(--neutral-100)]">
            {MVV.map(({ label, text }) => (
              <div
                key={label}
                className="py-8 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0
                  border-b md:border-b-0 border-[var(--neutral-100)] last:border-0"
              >
                <p
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] mb-6"
                  style={{ fontWeight: 600 }}
                >
                  {label}
                </p>
                <p
                  className="text-[15px] text-[var(--color-body)] leading-[1.9]"
                  style={{ fontWeight: 300 }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Empresas Parceiras ── */}
      <section className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32 border-t border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
                  style={{ fontWeight: 600 }}
                >
                  Ecossistema
                </span>
              </div>

              <h2
                className="text-[32px] sm:text-[40px] text-[var(--color-heading)] leading-[1.2] mb-8 max-w-[480px]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Conheça as empresas parceiras ao Núcleo Imobiliário.
              </h2>

              <p
                className="text-[15px] text-[var(--color-body)] leading-[1.85] mb-12 max-w-[520px]"
                style={{ fontWeight: 300 }}
              >
                Soluções diversas com empresas e profissionais afiliados ao Núcleo
                para viabilizar e tornar real seus sonhos e necessidades. Arquitetos,
                administração de obras, reformas, pinturas, móveis sob medida, box e
                sacadas, entre outros serviços.
              </p>

              <Link
                href="/parceiros-unus"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]
                  border-b border-[var(--secondary-900)]/30 hover:border-[var(--secondary-900)]
                  pb-0.5 transition-colors group"
                style={{ fontWeight: 600 }}
              >
                Ver todos os parceiros
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            {/* Tags de serviços */}
            <div className="flex flex-wrap gap-3 content-start pt-2">
              {PARCEIROS_SERVICOS.map((s) => (
                <span
                  key={s}
                  className="px-5 py-2.5 border border-[var(--neutral-200)] bg-white
                    text-[12px] text-[var(--color-heading)] uppercase tracking-[0.14em]"
                  style={{ fontWeight: 500 }}
                >
                  {s}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Slider — Conheça nossa Casa ── */}
      <section className="bg-[var(--secondary-900)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-[1px] bg-[var(--gold)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]/75"
                  style={{ fontWeight: 600 }}
                >
                  Nosso espaço
                </span>
              </div>
              <h2
                className="text-[32px] sm:text-[40px] text-white leading-[1.15]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Faça-nos uma visita e conheça{' '}
                <span className="italic text-[var(--gold)]" style={{ fontWeight: 600 }}>
                  nossa Casa!
                </span>
              </h2>
            </div>
          </div>
        </div>
        <OfficeSlider />
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--secondary-900)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-[1px] bg-[var(--gold)]" />
              <span
                className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]/75"
                style={{ fontWeight: 600 }}
              >
                Fale Conosco
              </span>
            </div>

            <h2
              className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.02em] text-white mb-6"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              Faça-nos uma visita e conheça{' '}
              <span className="italic text-[var(--gold)]" style={{ fontWeight: 600 }}>
                nossa Casa!
              </span>
            </h2>

            <p
              className="text-white/50 text-[16px] sm:text-[18px] leading-[1.8] mb-12"
              style={{ fontWeight: 300 }}
            >
              Seja qual for a sua necessidade, conte conosco!
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contato"
                className="inline-flex items-center gap-3 bg-white text-[var(--secondary-900)]
                  text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                  hover:bg-[var(--gold)] hover:text-white transition-colors group"
              >
                Entrar em contato
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </Link>

              <a
                href={whatsappUrl('Olá! Gostaria de conhecer melhor a UNUS Núcleo Imobiliário.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/25 text-white
                  text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                  hover:border-white transition-colors group"
              >
                WhatsApp
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
