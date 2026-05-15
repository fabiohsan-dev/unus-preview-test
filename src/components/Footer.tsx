import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, Youtube, Phone } from 'lucide-react';
import { UnusIcon } from '@/components/ui';
import { PHONE_DISPLAY, PHONE_HREF, PHONE2_DISPLAY, PHONE2_HREF } from '@/lib/constants';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
    </svg>
  );
}

const footerGroups = [
  {
    title: 'imóveis',
    items: [
      { label: 'Pronto para Morar', href: '/venda' },
      { label: 'Lançamentos',       href: '/venda?ordem=mais-novo' },
      { label: 'Casas',             href: '/venda?tipo=Casa' },
      { label: 'Coberturas',        href: '/venda?tipo=Cobertura' },
      { label: 'Investimentos',     href: '/#investimentos' },
    ],
  },
  {
    title: 'institucional',
    items: [
      { label: 'O Núcleo',           href: '/o-nucleo' },
      { label: 'Metodologia',        href: '/o-nucleo' },
      { label: 'Parceiros',          href: 'https://unusnucleoimobiliario.com.br/parceiros-unus/' },
      { label: 'Trabalhe Conosco',   href: 'https://unusnucleoimobiliario.com.br/contato/trabalhe-conosco/' },
      { label: 'Anuncie seu Imóvel', href: '/anuncie' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/unusnucleoimobiliario/',                                          Icon: Instagram   },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/unus-n%C3%BAcleo-imobili%C3%A1rio/?viewAsMember=true',    Icon: Linkedin    },
  { label: 'YouTube',   href: 'https://www.youtube.com/channel/UCH-dHKDW05Rw6iDkan765FA',                                 Icon: Youtube     },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@unusnucleoimobiliario',                                             Icon: TikTokIcon  },
];

const footerUnits = [
  {
    title:  'Continente',
    kicker: 'Unidade São José',
    lines:  [
      'Unus Núcleo Imobiliário',
      'Av. Elizeu di Bernardi, 34',
      'Campinas, São José — SC',
      'K Platz Corporate — Sala 601',
    ],
    creci:  'CRECI: 5.067 J',
    phones: [
      { display: PHONE_DISPLAY,  href: PHONE_HREF  },
      { display: PHONE2_DISPLAY, href: PHONE2_HREF },
    ],
  },
  {
    title:  'Florianópolis',
    kicker: 'Unidade Ilha',
    lines:  [
      'Unidade Ilha',
      'Agronômica, Florianópolis — SC',
      'Endereço completo a confirmar',
      'Grande Florianópolis',
    ],
    creci:  'CRECI: 5.067 J',
    phones: [
      { display: PHONE_DISPLAY, href: PHONE_HREF },
    ],
  },
];

function isExternalLink(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
}

const linkCls = 'text-[15px] leading-[1.45] text-white/70 hover:text-white transition-colors flex items-center gap-1.5 group font-light';

export function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 8% 0%, rgba(216,180,106,0.09) 0%, transparent 42%),
          radial-gradient(ellipse at 92% 0%, rgba(255,255,255,0.03) 0%, transparent 38%),
          linear-gradient(180deg, #0d1a24 0%, #050d13 100%)
        `,
      }}
    >
      {/* ── Linha decorativa topo ── */}
      <div
        className="h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(216,180,106,0.44), transparent)' }}
      />

      <div
        className="px-6 sm:px-8 lg:px-12 pb-10"
        style={{ paddingTop: 'clamp(72px, 7vw, 96px)' }}
      >
        <div className="max-w-[1400px] mx-auto">

          {/* ── Grade principal ── */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_0.95fr_0.95fr_1.18fr_1.05fr] pb-[58px] mb-[58px] border-b border-white/10"
            style={{ gap: 'clamp(38px, 4.2vw, 60px)' }}
          >

            {/* ── Coluna da marca ── */}
            <div className="md:col-span-2 lg:col-span-1">

              {/* Logo + nome */}
              <Link href="/" aria-label="Ir para a home da UNUS" className="inline-flex items-center gap-4 mb-6 group">
                <UnusIcon className="h-[50px] w-auto text-[var(--gold)] transition-opacity group-hover:opacity-80" />
                <div className="flex flex-col leading-none">
                  <span
                    className="text-white text-[20px] uppercase tracking-[0.12em]"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}
                  >
                    UNUS
                  </span>
                  <span
                    className="text-white/45 text-[10px] uppercase tracking-[0.18em] mt-2"
                    style={{ fontWeight: 600 }}
                  >
                    Núcleo Imobiliário
                  </span>
                </div>
              </Link>

              {/* Tagline */}
              <p className="text-white/70 text-[15px] leading-[1.72] max-w-[330px] mb-5 font-light">
                Inteligência imobiliária em alto padrão para São José, Florianópolis e Grande Florianópolis.
              </p>

              {/* Pill regional */}
              <div className="mb-7">
                <span
                  className="inline-flex items-center min-h-[30px] px-[11px] border border-[var(--gold)]/20 text-[var(--gold)]/70 text-[10px] font-semibold uppercase tracking-[0.14em]"
                >
                  São José · Florianópolis · SC
                </span>
              </div>

              {/* Redes sociais */}
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 border border-white/[0.12] flex items-center justify-center text-white/55 hover:text-white hover:border-[var(--gold)]/55 hover:bg-white/[0.04] transition-all"
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Colunas de links ── */}
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4
                  className="text-[12px] uppercase tracking-[0.16em] text-[var(--gold)]/75 mb-6"
                  style={{ fontWeight: 600 }}
                >
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {isExternalLink(item.href) ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={linkCls}
                        >
                          {item.label}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                        </a>
                      ) : (
                        <Link href={item.href} className={linkCls}>
                          {item.label}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ── Unidades físicas ── */}
            {footerUnits.map((unit) => (
              <div key={unit.title}>
                <h4
                  className="text-[12px] uppercase tracking-[0.16em] text-[var(--gold)]/75 mb-1"
                  style={{ fontWeight: 600 }}
                >
                  {unit.title}
                </h4>
                <p
                  className="text-[10px] uppercase tracking-[0.14em] text-white/35 mb-5"
                  style={{ fontWeight: 500 }}
                >
                  {unit.kicker}
                </p>

                {/* Card de endereço */}
                <div
                  className="relative pl-4 py-4 pr-4 border border-white/[0.085] mb-5"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.018) 100%)' }}
                >
                  {/* Linha dourada lateral */}
                  <div
                    className="absolute left-0 top-[15px] bottom-[15px] w-px"
                    style={{ background: 'linear-gradient(180deg, rgba(216,180,106,0.70) 0%, rgba(216,180,106,0.08) 100%)' }}
                  />
                  {unit.lines.map((line, i) => (
                    <span key={i} className="block text-[15px] leading-[1.58] text-white/[0.74] font-light">
                      {line}
                    </span>
                  ))}
                  <span
                    className="block mt-[10px] pt-[10px] border-t border-white/[0.07] text-[var(--gold)]/55 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  >
                    {unit.creci}
                  </span>
                </div>

                {/* Telefones */}
                <ul className="flex flex-col gap-3">
                  {unit.phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="flex items-center gap-3 text-[15px] text-white/[0.72] hover:text-white transition-colors font-light"
                      >
                        <Phone className="w-4 h-4 text-white/35 shrink-0" strokeWidth={1.5} />
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* ── Rodapé inferior ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-white/[0.06] pt-8">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <p className="text-white/50 text-[13px]" style={{ fontWeight: 400 }}>
                &copy; {new Date().getFullYear()} UNUS Núcleo Imobiliário. Todos os direitos reservados.
                {' '}Desenvolvido por{' '}
                <a
                  href="https://agenciaalea.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white/85 transition-colors"
                >
                  Agência Álea
                </a>
                .
              </p>
              <span className="hidden sm:block text-white/10">|</span>
              <span
                className="text-white/30 text-[12px] uppercase tracking-[0.10em]"
                style={{ fontWeight: 500 }}
              >
                CRECI: 5.067 J
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://unusnucleoimobiliario.com.br/politica-de-privacidade/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-[13px] hover:text-white transition-colors"
                style={{ fontWeight: 400 }}
              >
                Privacidade
              </a>
              <span className="text-white/10">·</span>
              <a
                href="https://unusnucleoimobiliario.com.br/politica-de-privacidade-e-cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-[13px] hover:text-white transition-colors"
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
