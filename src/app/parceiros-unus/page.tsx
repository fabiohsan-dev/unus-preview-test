import type { Metadata } from 'next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { whatsappUrl, SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Parceiros do Núcleo | UNUS Núcleo Imobiliário',
  description:
    'Conheça os parceiros do Núcleo UNUS: arquitetos, designers de interiores, empresas de reforma, automação, vidros, móveis e muito mais em Balneário Camboriú.',
  alternates: { canonical: `${SITE_URL}/parceiros-unus` },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Parceiros do Núcleo | UNUS Núcleo Imobiliário',
    description:
      'Profissionais e empresas de confiança que integram o ecossistema UNUS para viabilizar cada etapa da sua experiência imobiliária.',
    url: `${SITE_URL}/parceiros-unus`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'UNUS — Parceiros do Núcleo' }],
  },
};

/* ─────────── dados ─────────── */

const PARTNERS = [
  {
    name: 'Ademicon',
    category: 'Consórcio e Investimento',
    phone: '(48) 9 9650-2020',
    logo: '/partners/ademicon.webp',
  },
  {
    name: 'Beatriz Zeglin Arquitetura',
    category: 'Arquiteta de interiores',
    phone: '(48) 9 9958-3361',
    logo: '/partners/beatriz-zeglin.webp',
  },
  {
    name: 'Belluno Móveis',
    category: 'Móveis sob medida',
    phone: '(48) 9 8404-5869',
    logo: '/partners/belluno.webp',
  },
  {
    name: 'Bluhaus',
    category: 'Automação, sonorização, redes e segurança',
    phone: '(48) 9 9101-2516',
    logo: '/partners/bluhaus.webp',
  },
  {
    name: 'Carol Cortinas',
    category: 'Cortinas, persianas e papel de parede',
    phone: '(48) 9 9844-0024',
    logo: '/partners/carol-cortinas.webp',
  },
  {
    name: 'DWG Vidros',
    category: 'Box, fechamento de sacadas e vidros em geral',
    phone: '(48) 9 9985-1897',
    logo: '/partners/dwg-vidros.webp',
  },
  {
    name: 'Grupo INVI',
    category: 'Assessoria técnica · Síndico profissional',
    phone: '(48) 9 9625-7302',
    logo: '/partners/grupo-invi.webp',
  },
  {
    name: 'Improjel',
    category: 'Impermeabilizações',
    phone: '(48) 9 8476-6518',
    logo: '/partners/improjel.webp',
  },
  {
    name: 'Lares Empreendimentos',
    category: 'Administração de obras',
    phone: '(48) 9 8476-6518',
    logo: '/partners/lares.webp',
  },
  {
    name: 'Mais Art & Design',
    category: 'Design de interiores e arquitetura',
    phone: '(48) 9 8858-8763',
    logo: '/partners/mais-art-design.webp',
  },
  {
    name: 'Marmoart',
    category: 'Marmoraria',
    phone: '(48) 9 8402-1062',
    logo: '/partners/marmoart.webp',
  },
  {
    name: 'Pont Cred',
    category: 'Assessoria Financeira',
    phone: '(48) 3375-9009',
    logo: '/partners/pont-cred.webp',
  },
  {
    name: 'Sagas do Prado',
    category: 'Advocacia Imobiliária',
    phone: '(48) 9 9819-9304',
    logo: '/partners/sagas-do-prado.webp',
  },
  {
    name: 'SC Cortinas e Persianas',
    category: 'Cortinas, persianas e papel de parede',
    phone: '(48) 9 98404-9006',
    logo: '/partners/sc-cortinas.webp',
  },
  {
    name: 'Tec Clean',
    category: 'Climatização e Elétrica',
    phone: '(48) 9 9668-5407',
    logo: '/partners/tec-clean.webp',
  },
] as const;

function waLink(phone: string, name: string) {
  const digits = phone.replace(/\D/g, '');
  const e164 = digits.startsWith('55') ? digits : `55${digits}`;
  const msg = encodeURIComponent(
    `Olá! Vim pelo site da UNUS Núcleo Imobiliário e gostaria de mais informações sobre os serviços da ${name}.`
  );
  return `https://wa.me/${e164}?text=${msg}`;
}

/* ─────────── página ─────────── */

export default function ParceirosPage() {
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
              Ecossistema
            </span>
          </div>

          <h1
            className="text-[52px] sm:text-[68px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] text-white mb-8 max-w-[760px]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Parceiros do{' '}
            <span style={{ fontWeight: 600 }} className="italic text-[var(--gold)]">
              Núcleo.
            </span>
          </h1>

          <p
            className="text-white/50 text-[16px] sm:text-[18px] max-w-[540px] leading-[1.8]"
            style={{ fontWeight: 300 }}
          >
            Profissionais e empresas de confiança que integram o nosso
            ecossistema para viabilizar cada etapa da sua experiência imobiliária.
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-20 border-b border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-center">

            <p
              className="text-[17px] sm:text-[19px] text-[var(--color-body)] leading-[1.85] max-w-[640px]"
              style={{ fontWeight: 300 }}
            >
              Ao escolher a UNUS, você tem acesso a um ecossistema completo de
              parceiros criteriosamente selecionados. Do arquiteto ao síndico
              profissional, do marmoreiro ao especialista em automação — tudo
              para que o seu imóvel seja exatamente o que você imaginou.
            </p>

            <div className="flex items-end gap-4 lg:justify-end">
              <span
                className="text-[80px] lg:text-[96px] leading-none text-[var(--color-heading)] tracking-[-0.04em]"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                {PARTNERS.length}
              </span>
              <div className="mb-3">
                <div className="w-8 h-[1px] bg-[var(--gold)] mb-2" />
                <span
                  className="text-[13px] text-[var(--color-body)] leading-[1.5] block"
                  style={{ fontWeight: 300 }}
                >
                  empresas<br />parceiras
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Grid de parceiros ── */}
      <section className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
              style={{ fontWeight: 600 }}
            >
              Todos os parceiros
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[var(--neutral-100)]">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={waLink(p.phone, p.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white flex flex-col hover:bg-[var(--secondary-900)] transition-colors duration-300"
              >
                {/* Logo */}
                <div className="relative w-full aspect-square p-6 flex items-center justify-center bg-white group-hover:bg-[var(--secondary-900)] transition-colors duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src={p.logo}
                      alt={`Logo ${p.name}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                      className="object-contain p-2 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 py-5 border-t border-[var(--neutral-100)] group-hover:border-[var(--secondary-800)] flex-1 flex flex-col gap-1">
                  <p
                    className="text-[14px] text-[var(--color-heading)] leading-[1.3] group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="text-[11px] text-[var(--color-caption)] leading-[1.5] group-hover:text-white/50 transition-colors duration-300"
                    style={{ fontWeight: 300 }}
                  >
                    {p.category}
                  </p>
                </div>

                {/* CTA footer */}
                <div className="px-5 pb-5 flex items-center gap-2">
                  <MessageCircle
                    className="w-3 h-3 text-[var(--color-caption)] group-hover:text-[var(--gold)] transition-colors duration-300 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] group-hover:text-[var(--gold)] transition-colors duration-300"
                    style={{ fontWeight: 500 }}
                  >
                    {p.phone}
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA — Seja um parceiro ── */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-end">

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[var(--gold)]" />
                <span
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]/75"
                  style={{ fontWeight: 600 }}
                >
                  Faça parte
                </span>
              </div>

              <h2
                className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.02em] text-white mb-6"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Quer integrar o{' '}
                <span className="italic text-[var(--gold)]" style={{ fontWeight: 600 }}>
                  Núcleo?
                </span>
              </h2>

              <p
                className="text-white/50 text-[16px] sm:text-[18px] leading-[1.8] max-w-[480px]"
                style={{ fontWeight: 300 }}
              >
                Se você tem uma empresa ou atua como profissional em serviços
                relacionados ao mercado imobiliário, entre em contato e descubra
                como fazer parte do nosso ecossistema.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <a
                href={whatsappUrl('Olá! Tenho interesse em ser um parceiro do Núcleo UNUS. Podem me passar mais informações?')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3
                  bg-white text-[var(--secondary-900)]
                  text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                  hover:bg-[var(--gold)] hover:text-white transition-colors group"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Falar pelo WhatsApp
              </a>

              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-3
                  border border-white/25 text-white
                  text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                  hover:border-white transition-colors group"
              >
                Enviar mensagem
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
