import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerGroups = [
  {
    title: 'portfólio',
    items: [
      { label: 'Frente Mar', href: '/venda?tipo=Cobertura' },
      { label: 'Campinas', href: '/venda?bairro=Campinas' },
      { label: 'Coberturas', href: '/venda?tipo=Cobertura' },
      { label: 'Investimentos', href: '/#investimentos' },
      { label: 'Lançamentos', href: '/venda' },
    ],
  },
  {
    title: 'institucional',
    items: [
      { label: 'O Núcleo', href: '/o-nucleo' },
      { label: 'Metodologia', href: '/o-nucleo' },
      { label: 'Inteligência' },
      { label: 'Parceiros', href: 'https://unusnucleoimobiliario.com.br/parceiros-unus/' },
      { label: 'Trabalhe Conosco', href: 'https://unusnucleoimobiliario.com.br/contato/trabalhe-conosco/' },
    ],
  },
  {
    title: 'contato',
    items: [
      { label: '(48) 3066-6767', href: 'tel:+554830666767' },
      { label: 'contato@unusimoveis.com.br', href: 'mailto:contato@unusimoveis.com.br' },
      { label: 'K-Platz Corporate' },
      { label: 'São José, SC' },
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
    <footer className="text-white pt-20 pb-10 px-6 sm:px-8 lg:px-12 bg-[var(--secondary-900)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 pb-16 border-b border-white/8">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logo.webp"
                alt="UNUS Núcleo Imobiliário"
                width={77}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p
              className="text-white/60 text-[13px] leading-relaxed max-w-[260px] mb-8"
              style={{ fontWeight: 300 }}
            >
              Inteligência imobiliária em alto padrão. São José, Campinas e praias de
              Florianópolis.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4
                className="text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6"
                style={{ fontWeight: 600 }}
              >
                {group.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      isExternalLink(item.href) ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-[14px] text-white/75 hover:text-white transition-colors flex items-center gap-1.5 group"
                          style={{ fontWeight: 300 }}
                        >
                          {item.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-[14px] text-white/75 hover:text-white transition-colors flex items-center gap-1.5 group"
                          style={{ fontWeight: 300 }}
                        >
                          {item.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      )
                    ) : (
                      <span className="text-[14px] text-white/55" style={{ fontWeight: 300 }}>
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-[12px]" style={{ fontWeight: 400 }}>
            &copy; 2026 UNUS Núcleo Imobiliário. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://unusnucleoimobiliario.com.br/politica-de-privacidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 text-[12px] hover:text-white transition-colors"
              style={{ fontWeight: 400 }}
            >
              Política de Privacidade
            </a>
            <a
              href="https://unusnucleoimobiliario.com.br/politica-de-privacidade-e-cookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 text-[12px] hover:text-white transition-colors"
              style={{ fontWeight: 400 }}
            >
              Privacidade & Cookies
            </a>
            <span className="text-white/60 text-[12px]" style={{ fontWeight: 400 }}>
              CRECI 12345-J
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
