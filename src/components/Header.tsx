'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UnusLogo } from '@/components/ui';
import { Heart, Menu, X, ChevronDown, Instagram, Youtube } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
    </svg>
  );
}

const dropdownItems = [
  { label: 'Ver todos os imóveis', href: '/venda' },
  { label: 'Empreendimentos',      href: '/empreendimentos' },
  { label: 'Abaixo do preço',      href: '/venda?ordem=menor-preco' },
  { label: 'Imóvel vazio',         href: '/venda?ordem=mais-novo' },
  { label: 'Na planta',            href: '/empreendimentos' },
  { label: 'Sala comercial',       href: '/venda?tipo=Sala Comercial' },
  { label: 'Terreno',              href: '/venda?tipo=Terreno' },
];

const leftNavItems = [
  { label: 'Anuncie', href: '/anuncie' },
  { label: 'Blog',    href: '/blog' },
];

const rightNavItems = [
  { label: 'Contato', href: '/contato' },
];

const allMobileItems = [
  { label: 'Anuncie seu imóvel', href: '/anuncie' },
  { label: 'Blog',               href: '/blog' },
  { label: 'Contato',            href: '/contato' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/unusnucleoimobiliario', icon: Instagram },
  { label: 'YouTube',   href: 'https://www.youtube.com/@unusnucleoimobiliario',  icon: Youtube },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@unusnucleoimobiliario',   icon: TikTokIcon },
];

export function Header() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const dropdownCloseTimer                = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown  = () => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownCloseTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };
  const pathname  = usePathname();
  const isHome    = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [pathname]);

  useEffect(() => {
    const onClickOutside = () => setDropdownOpen(false);
    if (dropdownOpen) document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const textColor  = transparent ? 'text-white/85' : 'text-[var(--color-heading)]';
  const hoverStyle = 'hover:opacity-60 transition-opacity duration-300';
  const linkStyle  = `text-[11px] uppercase tracking-[0.12em] leading-none ${textColor} ${hoverStyle}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── DESKTOP — 3 colunas ── */}
        <div className="hidden lg:grid grid-cols-3 items-center h-24">

          {/* Esquerda: navegação principal */}
          <div className="flex items-center gap-7">
            {leftNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkStyle}
                style={{ fontWeight: pathname === item.href ? 600 : 500 }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Centro — Logo */}
          <div className="flex justify-center">
            <Link href="/" aria-label="Ir para a home da UNUS">
              <UnusLogo
                className={`h-7 w-auto transition-all duration-500 ${transparent ? 'text-white' : 'text-[var(--secondary-900)]'}`}
              />
            </Link>
          </div>

          {/* Direita: Contato + Ver imóveis dropdown + Favoritos + Corretor */}
          <div className="flex items-center justify-end gap-7">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkStyle}
                style={{ fontWeight: pathname === item.href ? 600 : 500 }}
              >
                {item.label}
              </Link>
            ))}

            {/* Ver imóveis: link direto + chevron dropdown separado */}
            <div
              className="relative flex items-center gap-0.5"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <Link
                href="/venda"
                className={linkStyle}
                style={{ fontWeight: pathname === '/venda' ? 600 : 500 }}
              >
                Ver imóveis
              </Link>
              <button
                className={`p-1 ${textColor} ${hoverStyle}`}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-label="Filtros de imóveis"
                onClick={(e) => { e.stopPropagation(); setDropdownOpen((v) => !v); }}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  strokeWidth={1.75}
                />
              </button>

              {/* Ponte invisível para não fechar ao passar para o painel */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 h-2" />
              )}

              <div
                className={`absolute top-[calc(100%+8px)] right-0 w-56 bg-white shadow-[var(--shadow-elevated)]
                            transition-all duration-200 origin-top
                            ${dropdownOpen
                              ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                              : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                            }`}
                role="listbox"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                {dropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-5 py-3.5 text-[13px] leading-[1.25] tracking-[0.01em]
                               text-[var(--color-heading)] hover:bg-[var(--neutral-50)]
                               hover:text-[var(--deep-blue)] hover:font-medium
                               border-b border-[var(--neutral-100)] last:border-0 transition-colors"
                    style={{ fontWeight: 400 }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Favoritos */}
            <Link
              href="/favoritos"
              className={`${textColor} ${hoverStyle}`}
              aria-label="Favoritos"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>

            {/* Redes sociais */}
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`${textColor} ${hoverStyle}`}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden flex items-center justify-between h-20">
          <Link href="/" aria-label="Ir para a home da UNUS">
            <UnusLogo
              className={`h-6 w-auto transition-all duration-500 ${transparent ? 'text-white' : 'text-[var(--secondary-900)]'}`}
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((c) => !c)}
            className={`p-2 cursor-pointer transition-colors ${
              transparent ? 'text-white' : 'text-[var(--color-heading)]'
            }`}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen
              ? <X    className="w-6 h-6" />
              : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-white border-t border-[var(--neutral-200)]"
        >
          <nav className="px-6 py-6 space-y-1" aria-label="Menu mobile">

            {/* Ver imóveis */}
            <p
              className="pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--gold-dark)]"
              style={{ fontWeight: 600 }}
            >
              Ver imóveis
            </p>
            {dropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-[14px] leading-[1.35] tracking-normal text-[var(--color-heading)] border-b border-[var(--neutral-100)] pl-3"
                style={{ fontWeight: 400 }}
              >
                {item.label}
              </Link>
            ))}

            {/* Outras páginas */}
            <div className="pt-4 space-y-1">
              {allMobileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3.5 text-[14px] leading-[1.35] tracking-normal text-[var(--color-heading)] border-b border-[var(--neutral-200)]"
                  style={{ fontWeight: 400 }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Favoritos */}
            <div className="pt-5 flex flex-col gap-3">
              <Link
                href="/favoritos"
                className="flex items-center justify-center gap-2 w-full bg-[var(--secondary-900)] text-white py-3.5 text-[12px] uppercase tracking-[0.12em] leading-none"
                style={{ fontWeight: 600 }}
              >
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                Favoritos
              </Link>
            </div>

            {/* Redes sociais */}
            <div className="pt-5 flex items-center justify-center gap-5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-heading)] hover:opacity-60 transition-opacity duration-300"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
