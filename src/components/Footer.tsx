import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, MapPin, Phone, Youtube } from 'lucide-react';
import { UnusIcon } from '@/components/ui';
import { PHONE_DISPLAY, PHONE_HREF, UNITS } from '@/lib/constants';

const footerGroups = [
  {
    title: 'portfólio',
    items: [
      { label: 'Pronto para Morar', href: '/venda' },
      { label: 'Lançamentos', href: '/venda?ordem=mais-novo' },
      { label: 'Casas', href: '/venda?categoria=Casa' },
      { label: 'Coberturas', href: '/venda?tipo=Cobertura' },
      { label: 'Investimentos', href: '/#investimentos' },
    ],
  },
  {
    title: 'institucional',
    items: [
      { label: 'O Núcleo', href: '/o-nucleo' },
      { label: 'Metodologia', href: '/o-nucleo' },
      { label: 'Parceiros', href: 'https://unusnucleoimobiliario.com.br/parceiros-unus/' },
      { label: 'Trabalhe Conosco', href: 'https://unusnucleoimobiliario.com.br/contato/trabalhe-conosco/' },
      { label: 'Anuncie seu Imóvel', href: '/anuncie' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/unusnucleoimobiliario/',
    Icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/unus-n%C3%BAcleo-imobili%C3%A1rio/?viewAsMember=true',
    Icon: Linkedin,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCH-dHKDW05Rw6iDkan765FA',
    Icon: Youtube,
  },
];

function isExternalLink(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
}

export function Footer() {
  return (
    <footer className="text-white bg-[var(--secondary-900)]">
      {/* Faixa decorativa topo */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      <div className="pt-20 pb-10 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Grade principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10 mb-16 pb-16 border-b border-white/10">

            {/* Coluna da marca */}
            <div className="lg:col-span-1">

              {/* Identidade visual */}
              <Link href="/" aria-label="Ir para a home da UNUS" className="inline-flex items-center gap-4 mb-6 group">
                <UnusIcon className="h-14 w-auto text-[var(--gold)] transition-opacity group-hover:opacity-80" />
                <div className="flex flex-col leading-none">
                  <span
                    className="text-white text-[18px] tracking-[0.08em] uppercase"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, letterSpacing: '0.12em' }}
                  >
                    UNUS
                  </span>
                  <span
                    className="text-white/45 text-[9px] uppercase tracking-[0.22em] mt-1"
                    style={{ fontWeight: 500 }}
                  >
                    Núcleo Imobiliário
                  </span>
                </div>
              </Link>

              {/* Tagline */}
              <p
                className="text-white/55 text-[14px] leading-[1.7] max-w-[240px] mb-8"
                style={{ fontWeight: 300 }}
              >
                Inteligência imobiliária em alto padrão. Balneário Camboriú, Itapema e região.
              </p>

              {/* Redes sociais */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/15 flex items-center justify-center hover:border-[var(--gold)]/60 hover:bg-white/5 transition-all"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-white/60 hover:text-white transition-colors" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links de navegação */}
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4
                  className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/70 mb-7"
                  style={{ fontWeight: 600 }}
                >
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        isExternalLink(item.href) ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-[15px] text-white/65 hover:text-white transition-colors flex items-center gap-1.5 group"
                            style={{ fontWeight: 300 }}
                          >
                            {item.label}
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-[15px] text-white/65 hover:text-white transition-colors flex items-center gap-1.5 group"
                            style={{ fontWeight: 300 }}
                          >
                            {item.label}
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                          </Link>
                        )
                      ) : (
                        <span className="text-[15px] text-white/40" style={{ fontWeight: 300 }}>
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Unidades físicas */}
            {UNITS.map((unit) => (
              <div key={unit.city}>
                <h4
                  className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/70 mb-7"
                  style={{ fontWeight: 600 }}
                >
                  {unit.city}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/35" strokeWidth={1.5} />
                    <span className="text-[14px] text-white/65 leading-[1.65]" style={{ fontWeight: 300 }}>
                      {unit.address}
                      <br />
                      {unit.neighborhood}, {unit.city} — {unit.state}
                      <br />
                      CEP {unit.cep}
                    </span>
                  </li>
                  <li>
                    <a
                      href={PHONE_HREF}
                      className="flex items-center gap-2.5 text-[14px] text-white/65 hover:text-white transition-colors"
                      style={{ fontWeight: 300 }}
                    >
                      <Phone className="w-4 h-4 text-white/35 shrink-0" strokeWidth={1.5} />
                      {PHONE_DISPLAY}
                    </a>
                  </li>
                  <li
                    className="text-[11px] text-[var(--gold)]/50 uppercase tracking-[0.18em]"
                    style={{ fontWeight: 500 }}
                  >
                    {unit.creci}
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Rodapé inferior */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-center sm:text-left">
              <p className="text-white/40 text-[12px]" style={{ fontWeight: 400 }}>
                &copy; {new Date().getFullYear()} UNUS Núcleo Imobiliário.
                {' '}Todos os direitos reservados a{' '}
                <span className="text-white/60" style={{ fontWeight: 500 }}>FHSAN</span>.
              </p>
              <span className="hidden sm:block text-white/20 text-[12px]">·</span>
              <span className="text-white/30 text-[12px]" style={{ fontWeight: 400 }}>
                {UNITS.map((u) => u.creci).join(' · ')}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://unusnucleoimobiliario.com.br/politica-de-privacidade/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 text-[12px] hover:text-white/65 transition-colors"
                style={{ fontWeight: 400 }}
              >
                Privacidade
              </a>
              <span className="text-white/20 text-[12px]">·</span>
              <a
                href="https://unusnucleoimobiliario.com.br/politica-de-privacidade-e-cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 text-[12px] hover:text-white/65 transition-colors"
                style={{ fontWeight: 400 }}
              >
                Cookies
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
