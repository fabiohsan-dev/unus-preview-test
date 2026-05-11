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
    <main className="min-h-screen pt-24 pb-20 bg-[var(--color-background)]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Cabeçalho */}
        <div className="mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--gold)]" />
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-dark)]"
              style={{ fontWeight: 600 }}
            >
              Fale Conosco
            </span>
          </div>
          <h1
            className="text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-0.02em] text-[var(--color-heading)] mb-6"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Fale com o{' '}
            <span style={{ fontWeight: 600 }} className="italic">Núcleo.</span>
          </h1>
          <p
            className="text-[var(--color-body)] text-[16px] sm:text-[18px] max-w-[560px] leading-[1.75]"
            style={{ fontWeight: 300 }}
          >
            Estamos prontos para transformar sua jornada imobiliária com
            inteligência, estratégia e exclusividade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* ── Coluna Esquerda ── */}
          <div className="space-y-20">

            {/* Formulário */}
            <section>
              <h2
                className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-heading)] font-semibold mb-8 flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[var(--secondary-900)]" />
                Contato rápido
              </h2>
              <ContatoForm />
            </section>

            {/* Unidades */}
            <section>
              <h2
                className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-heading)] font-semibold mb-10 flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[var(--secondary-900)]" />
                Onde estamos
              </h2>

              <div className="space-y-10">
                {UNITS.map((unit) => (
                  <div key={unit.city} className="flex gap-5 items-start">
                    <div className="w-11 h-11 border border-[var(--neutral-200)] flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-[var(--color-heading)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p
                        className="text-[15px] text-[var(--color-heading)] mb-1.5"
                        style={{ fontWeight: 500 }}
                      >
                        {unit.city}
                      </p>
                      <p
                        className="text-[14px] text-[var(--color-body)] leading-[1.7] mb-3"
                        style={{ fontWeight: 300 }}
                      >
                        {unit.address}<br />
                        {unit.neighborhood}, {unit.city} — {unit.state}<br />
                        CEP {unit.cep}
                      </p>
                      <p
                        className="text-[11px] text-[var(--color-caption)] uppercase tracking-[0.16em] mb-3"
                        style={{ fontWeight: 500 }}
                      >
                        {unit.creci}
                      </p>
                      <a
                        href={MAPS_URLS[unit.city]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--color-heading)] uppercase tracking-[0.14em] border-b border-[var(--secondary-900)]/20 hover:border-[var(--secondary-900)] transition-colors pb-0.5"
                      >
                        Ver no mapa <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Canais de contato */}
            <section>
              <h2
                className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-heading)] font-semibold mb-8 flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[var(--secondary-900)]" />
                Canais
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <a
                  href={PHONE_HREF}
                  className="flex gap-4 items-center group"
                >
                  <div className="w-11 h-11 border border-[var(--neutral-200)] group-hover:border-[var(--secondary-900)] flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-caption)] font-medium">Telefone</p>
                    <p className="text-[15px] text-[var(--color-heading)] font-medium">{PHONE_DISPLAY}</p>
                  </div>
                </a>

                <a
                  href={whatsappUrl(WA_DEFAULT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center group"
                >
                  <div className="w-11 h-11 border border-[var(--neutral-200)] group-hover:border-[var(--color-action-whatsapp)] flex items-center justify-center shrink-0 transition-colors">
                    <MessageCircle className="w-4 h-4 text-[var(--color-action-whatsapp)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-caption)] font-medium">WhatsApp</p>
                    <p className="text-[15px] text-[var(--color-heading)] font-medium">{PHONE_DISPLAY}</p>
                  </div>
                </a>

                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 border border-[var(--neutral-200)] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[var(--color-heading)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-caption)] font-medium">Horário</p>
                    <p className="text-[14px] text-[var(--color-heading)] font-medium leading-snug">
                      Seg–Sex 9h–18h<br />
                      <span className="text-[var(--color-body)] font-light">Sáb 9h–13h</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* ── Coluna Direita (sticky) ── */}
          <div className="space-y-5 lg:sticky lg:top-32">

            {/* Card: Quero Comprar */}
            <Link
              href="/venda"
              className="group block p-10 bg-[var(--secondary-900)] text-white relative overflow-hidden hover:bg-[var(--secondary-800)] transition-colors duration-300"
            >
              <div className="relative z-10">
                <Building2 className="w-8 h-8 text-[var(--gold)] mb-6" strokeWidth={1.5} />
                <h3
                  className="text-[26px] mb-2 text-white"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                >
                  Quero comprar
                </h3>
                <p
                  className="text-white/60 text-[14px] mb-8 max-w-[280px] leading-[1.7]"
                  style={{ fontWeight: 300 }}
                >
                  Explore nossa curadoria de imóveis de alto padrão e encontre
                  seu próximo destino.
                </p>
                <div
                  className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]"
                  style={{ fontWeight: 600 }}
                >
                  Ver imóveis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] rounded-bl-full -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700" />
            </Link>

            {/* Card: Quero Anunciar */}
            <Link
              href="/anuncie"
              className="group block p-10 border border-[var(--neutral-200)] bg-white text-[var(--color-heading)] relative overflow-hidden hover:border-[var(--secondary-900)] transition-colors duration-300"
            >
              <div className="relative z-10">
                <MessageCircle className="w-8 h-8 text-[var(--color-heading)] mb-6" strokeWidth={1.5} />
                <h3
                  className="text-[26px] mb-2"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                >
                  Quero anunciar
                </h3>
                <p
                  className="text-[var(--color-body)] text-[14px] mb-8 max-w-[280px] leading-[1.7]"
                  style={{ fontWeight: 300 }}
                >
                  Consultoria especializada para proprietários que buscam
                  valorização e liquidez.
                </p>
                <div
                  className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]"
                  style={{ fontWeight: 600 }}
                >
                  Falar com consultor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
                </div>
              </div>
            </Link>

            {/* Links secundários */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <a
                href="https://unusnucleoimobiliario.com.br/contato/trabalhe-conosco/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-caption)] mb-2" style={{ fontWeight: 500 }}>
                  Carreiras
                </p>
                <p className="text-[13px] text-[var(--color-heading)] flex items-center gap-2" style={{ fontWeight: 600 }}>
                  Trabalhe conosco
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" strokeWidth={1.5} />
                </p>
              </a>
              <a
                href="https://unusnucleoimobiliario.com.br/parceiros-unus/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-[var(--neutral-200)] hover:border-[var(--secondary-900)] transition-colors group"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-caption)] mb-2" style={{ fontWeight: 500 }}>
                  Parcerias
                </p>
                <p className="text-[13px] text-[var(--color-heading)] flex items-center gap-2" style={{ fontWeight: 600 }}>
                  Seja parceiro
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" strokeWidth={1.5} />
                </p>
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
