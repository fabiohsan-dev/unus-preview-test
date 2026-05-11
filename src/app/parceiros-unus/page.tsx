import type { Metadata } from 'next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { whatsappUrl, SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Parceiros do Núcleo | UNUS Núcleo Imobiliário',
  description:
    'Conheça os parceiros do Núcleo UNUS: arquitetos, designers de interiores, empresas de reforma, automação, vidros, móveis e muito mais em Balneário Camboriú.',
  alternates: { canonical: `${SITE_URL}/parceiros-unus` },
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
  },
  {
    name: 'Beatriz Zeglin Arquitetura',
    category: 'Arquiteta de interiores',
    phone: '(48) 9 9958-3361',
  },
  {
    name: 'Belluno Móveis',
    category: 'Móveis sob medida',
    phone: '(48) 9 8404-5869',
  },
  {
    name: 'Bluhaus',
    category: 'Automação, sonorização, redes e segurança',
    phone: '(48) 9 9101-2516',
  },
  {
    name: 'Carol Cortinas',
    category: 'Cortinas, persianas e papel de parede',
    phone: '(48) 9 9844-0024',
  },
  {
    name: 'DWG Vidros',
    category: 'Box, fechamento de sacadas e vidros em geral',
    phone: '(48) 9 9985-1897',
  },
  {
    name: 'Grupo INVI',
    category: 'Assessoria técnica · Síndico profissional',
    phone: '(48) 9 9625-7302',
  },
  {
    name: 'Improjel',
    category: 'Impermeabilizações',
    phone: '(48) 9 8476-6518',
  },
  {
    name: 'Lares Empreendimentos',
    category: 'Administração de obras',
    phone: '(48) 9 8476-6518',
  },
  {
    name: 'Mais Art & Design',
    category: 'Design de interiores e arquitetura',
    phone: '(48) 9 8858-8763',
  },
  {
    name: 'Marmoart',
    category: 'Marmoraria',
    phone: '(48) 9 8402-1062',
  },
  {
    name: 'Pont Cred',
    category: 'Assessoria Financeira',
    phone: '(48) 3375-9009',
  },
  {
    name: 'Sagas do Prado',
    category: 'Advocacia Imobiliária',
    phone: '(48) 9 9819-9304',
  },
  {
    name: 'SC Cortinas e Persianas',
    category: 'Cortinas, persianas e papel de parede',
    phone: '(48) 9 98404-9006',
  },
  {
    name: 'Tec Clean',
    category: 'Climatização e Elétrica',
    phone: '(48) 9 9668-5407',
  },
] as const;

/* Monta link WhatsApp com número limpo */
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

      {/* ── Intro — números + descrição ── */}
      <section className="bg-white px-6 sm:px-8 lg:px-12 py-20 border-b border-[var(--neutral-100)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-center">

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

      {/* ── Diretório de parceiros ── */}
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

          {/* Cabeçalho da tabela — apenas desktop */}
          <div className="hidden lg:grid grid-cols-[64px_1fr_240px_200px] gap-6 pb-4 mb-2 border-b border-[var(--neutral-200)]">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]"
              style={{ fontWeight: 500 }}
            >
              N.º
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]"
              style={{ fontWeight: 500 }}
            >
              Empresa
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]"
              style={{ fontWeight: 500 }}
            >
              Telefone
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)]"
              style={{ fontWeight: 500 }}
            >
              Contato
            </span>
          </div>

          {/* Linhas */}
          <div className="divide-y divide-[var(--neutral-100)]">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className="grid grid-cols-1 lg:grid-cols-[64px_1fr_240px_200px]
                  gap-3 lg:gap-6 py-7 lg:items-center
                  hover:bg-white/60 transition-colors duration-200 lg:-mx-4 lg:px-4"
              >
                {/* Número */}
                <span
                  className="hidden lg:block text-[12px] text-[var(--gold)] tabular-nums"
                  style={{ fontWeight: 600, letterSpacing: '0.1em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Nome + categoria */}
                <div>
                  <h2
                    className="text-[20px] sm:text-[22px] text-[var(--color-heading)] leading-[1.2] mb-1"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {/* Número inline só no mobile */}
                    <span
                      className="lg:hidden text-[11px] text-[var(--gold)] tabular-nums mr-3 align-middle"
                      style={{ fontWeight: 600, letterSpacing: '0.1em', fontFamily: 'var(--font-sans)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.name}
                  </h2>
                  <p
                    className="text-[13px] text-[var(--color-body)] leading-[1.6]"
                    style={{ fontWeight: 300 }}
                  >
                    {p.category}
                  </p>
                </div>

                {/* Telefone */}
                <p
                  className="text-[14px] text-[var(--color-body)] tabular-nums"
                  style={{ fontWeight: 300 }}
                >
                  {p.phone}
                </p>

                {/* CTA WhatsApp */}
                <a
                  href={waLink(p.phone, p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start
                    text-[11px] uppercase tracking-[0.18em]
                    border border-[var(--neutral-300)] hover:border-[var(--secondary-900)]
                    hover:bg-[var(--secondary-900)] hover:text-white
                    px-5 py-2.5 transition-all duration-200 group w-fit"
                  style={{ fontWeight: 500 }}
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  Entrar em contato
                </a>
              </div>
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
