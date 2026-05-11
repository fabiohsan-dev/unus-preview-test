import type { Metadata } from 'next';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { UNITS, PHONE_DISPLAY, PHONE_HREF, whatsappUrl, WA_DEFAULT, SITE_URL } from '@/lib/constants';
import { ContatoForm } from './ContatoForm';

export const metadata: Metadata = {
  title: 'Contato | UNUS Núcleo Imobiliário',
  description: 'Fale com nossos especialistas. Atendimento personalizado para compra, venda e parcerias em Balneário Camboriú, Itapema e região.',
  alternates: { canonical: `${SITE_URL}/contato` },
  openGraph: {
    title: 'Contato | UNUS Núcleo Imobiliário',
    description: 'Fale com nossos especialistas. Atendimento personalizado para compra, venda e parcerias.',
    url: `${SITE_URL}/contato`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'UNUS — Contato' }],
  },
};

const MAPS_URLS: Record<string, string> = {
  'Balneário Camboriú':
    'https://www.google.com/maps/search/?api=1&query=Av+Brasil+3322+Centro+Balne%C3%A1rio+Cambori%C3%BA+SC',
  'Itapema':
    'https://www.google.com/maps/search/?api=1&query=Av+Nereu+Ramos+3625+Meia+Praia+Itapema+SC',
};

export default function ContatoPage() {
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
              Fale Conosco
            </span>
          </div>

          <h1
            className="text-[52px] sm:text-[68px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] text-white mb-8 max-w-[700px]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Fale com o{' '}
            <span style={{ fontWeight: 600 }} className="italic text-[var(--gold)]">
              Núcleo.
            </span>
          </h1>

          <p
            className="text-white/50 text-[16px] sm:text-[18px] max-w-[480px] leading-[1.8]"
            style={{ fontWeight: 300 }}
          >
            Estamos prontos para transformar sua jornada imobiliária com
            inteligência, estratégia e exclusividade.
          </p>
        </div>
      </section>

      {/* ── Conteúdo ── */}
      <main className="bg-[var(--color-background)] px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-20 lg:gap-24 items-start">

            {/* ── Esquerda ── */}
            <div className="space-y-24">

              {/* Formulário */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                  <h2
                    className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-heading)]"
                    style={{ fontWeight: 600 }}
                  >
                    Contato rápido
                  </h2>
                </div>
                <ContatoForm />
              </section>

              {/* Unidades */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                  <h2
                    className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-heading)]"
                    style={{ fontWeight: 600 }}
                  >
                    Onde estamos
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-12">
                  {UNITS.map((unit) => (
                    <div key={unit.city}>
                      <p
                        className="text-[14px] text-[var(--color-heading)] uppercase tracking-[0.2em] mb-5"
                        style={{ fontWeight: 600 }}
                      >
                        {unit.city}
                      </p>
                      <div className="flex gap-4 items-start mb-4">
                        <MapPin className="w-4 h-4 text-[var(--color-caption)] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p
                          className="text-[14px] text-[var(--color-body)] leading-[1.8]"
                          style={{ fontWeight: 300 }}
                        >
                          {unit.address}<br />
                          {unit.neighborhood} — {unit.state}<br />
                          CEP {unit.cep}
                        </p>
                      </div>
                      <p
                        className="text-[11px] text-[var(--color-caption)] uppercase tracking-[0.18em] mb-4 pl-8"
                        style={{ fontWeight: 500 }}
                      >
                        {unit.creci}
                      </p>
                      <a
                        href={MAPS_URLS[unit.city]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 pl-8 text-[11px] text-[var(--color-heading)] uppercase tracking-[0.16em] border-b border-[var(--secondary-900)]/20 hover:border-[var(--secondary-900)] transition-colors pb-0.5"
                        style={{ fontWeight: 600 }}
                      >
                        Ver no mapa <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Canais */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-[1px] bg-[var(--secondary-900)]" />
                  <h2
                    className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-heading)]"
                    style={{ fontWeight: 600 }}
                  >
                    Canais de atendimento
                  </h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-8">
                  <a href={PHONE_HREF} className="group flex flex-col gap-4">
                    <div className="w-12 h-12 border border-[var(--neutral-200)] group-hover:border-[var(--secondary-900)] flex items-center justify-center transition-colors">
                      <Phone className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)] mb-1" style={{ fontWeight: 500 }}>Telefone</p>
                      <p className="text-[15px] text-[var(--color-heading)]" style={{ fontWeight: 500 }}>{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                  <a
                    href={whatsappUrl(WA_DEFAULT)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 border border-[var(--neutral-200)] group-hover:border-[var(--color-action-whatsapp)] flex items-center justify-center transition-colors">
                      <MessageCircle className="w-4 h-4 text-[var(--color-action-whatsapp)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)] mb-1" style={{ fontWeight: 500 }}>WhatsApp</p>
                      <p className="text-[15px] text-[var(--color-heading)]" style={{ fontWeight: 500 }}>{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 border border-[var(--neutral-200)] flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)] mb-1" style={{ fontWeight: 500 }}>Horário</p>
                      <p className="text-[15px] text-[var(--color-heading)] leading-snug" style={{ fontWeight: 500 }}>
                        Seg–Sex 9h–18h
                      </p>
                      <p className="text-[14px] text-[var(--color-body)]" style={{ fontWeight: 300 }}>Sáb 9h–13h</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Direita (sticky) ── */}
            <div className="space-y-4 lg:sticky lg:top-32">

              <Link
                href="/venda"
                className="group block p-10 bg-[var(--secondary-900)] text-white relative overflow-hidden hover:bg-[var(--secondary-800)] transition-colors duration-300"
              >
                <div className="relative z-10">
                  <Building2 className="w-7 h-7 text-[var(--gold)] mb-8" strokeWidth={1.5} />
                  <h3
                    className="text-[28px] mb-3 text-white leading-tight"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                  >
                    Quero comprar
                  </h3>
                  <p
                    className="text-white/50 text-[14px] mb-10 leading-[1.75]"
                    style={{ fontWeight: 300 }}
                  >
                    Explore nossa curadoria de imóveis de alto padrão e encontre
                    seu próximo destino.
                  </p>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]" style={{ fontWeight: 600 }}>
                    Ver imóveis
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-white/5 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full border border-white/5 group-hover:scale-110 transition-transform duration-700" />
              </Link>

              <Link
                href="/anuncie"
                className="group block p-10 border border-[var(--neutral-200)] bg-white hover:border-[var(--secondary-900)] transition-colors duration-300"
              >
                <MessageCircle className="w-7 h-7 text-[var(--color-heading)] mb-8" strokeWidth={1.5} />
                <h3
                  className="text-[28px] mb-3 leading-tight"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                >
                  Quero anunciar
                </h3>
                <p
                  className="text-[var(--color-body)] text-[14px] mb-10 leading-[1.75]"
                  style={{ fontWeight: 300 }}
                >
                  Consultoria especializada para proprietários que buscam
                  valorização e liquidez.
                </p>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]" style={{ fontWeight: 600 }}>
                  Falar com consultor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://unusnucleoimobiliario.com.br/contato/trabalhe-conosco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-2" style={{ fontWeight: 500 }}>Carreiras</p>
                  <p className="text-[13px] text-[var(--color-heading)] flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    Trabalhe conosco
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </p>
                </a>
                <a
                  href="https://unusnucleoimobiliario.com.br/parceiros-unus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-caption)] mb-2" style={{ fontWeight: 500 }}>Parcerias</p>
                  <p className="text-[13px] text-[var(--color-heading)] flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                    Seja parceiro
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </p>
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
