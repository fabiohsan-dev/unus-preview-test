'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, ChevronDown, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/554830666767?text=Olá!%20Gostaria%20de%20falar%20com%20um%20corretor%20UNUS.';

const dropdownItems = [
  { label: 'Ver todos os imóveis', href: '/venda' },
  { label: 'Abaixo do preço',      href: '/venda?ordem=menor-preco' },
  { label: 'Imóvel vazio',         href: '/venda?tipo=vazio' },
  { label: 'Na planta',            href: '/venda?tipo=na-planta' },
  { label: 'Sala comercial',       href: '/venda?categoria=Sala Comercial' },
  { label: 'Terreno',              href: '/venda?categoria=Terreno' },
];

const leftNavItems = [
  { label: 'Anuncie',   href: '/anuncie' },
  { label: 'O Núcleo',  href: '/o-nucleo' },
  { label: 'Blog',      href: '/blog' },
];

const rightNavItems = [
  { label: 'Contato', href: '/contato' },
];

const allMobileItems = [
  { label: 'Anuncie seu imóvel', href: '/anuncie' },
  { label: 'O Núcleo',          href: '/o-nucleo' },
  { label: 'Blog',              href: '/blog' },
  { label: 'Contato',           href: '/contato' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname  = usePathname();
  const isHome    = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

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
  const logoFilter = transparent ? 'brightness-0 invert' : 'brightness-0';
  const linkStyle  = `text-[11px] uppercase tracking-[0.1em] ${textColor} ${hoverStyle}`;

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

          {/* Esquerda: nav + Fale com corretor */}
          <div className="flex items-center gap-7">
            {leftNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkStyle}
                style={{ fontWeight: pathname === item.href ? 600 : 400 }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Centro — Logo */}
          <div className="flex justify-center">
            <Link href="/" aria-label="Ir para a home da UNUS">
              <Image
                src="/images/logo.webp"
                alt="UNUS"
                width={77}
                height={48}
                priority
                className={`h-11 w-auto object-contain transition-all duration-500 ${logoFilter}`}
              />
            </Link>
          </div>

          {/* Direita: Contato + Ver imóveis dropdown + Favoritos + Fale */}
          <div className="flex items-center justify-end gap-7">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkStyle}
                style={{ fontWeight: pathname === item.href ? 600 : 400 }}
              >
                {item.label}
              </Link>
            ))}

            {/* Dropdown Ver imóveis */}
            <div className="relative group">
              <button
                className={`inline-flex items-center gap-1.5 ${linkStyle}`}
                style={{ fontWeight: 500 }}
                aria-haspopup="true"
              >
                Ver imóveis
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                  strokeWidth={2}
                />
              </button>

              <div
                className="absolute top-full right-0 mt-4 w-56 bg-white shadow-[var(--shadow-elevated)]
                           opacity-0 invisible pointer-events-none translate-y-1
                           group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0
                           transition-all duration-200"
              >
                {dropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-3.5 text-[12px] text-[var(--color-heading)]
                               hover:bg-[var(--neutral-50)] hover:text-[var(--deep-blue)]
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

            {/* Fale com corretor — CTA sutil */}
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 ${linkStyle} border ${
                transparent ? 'border-white/30 hover:border-white/60' : 'border-[var(--neutral-300)] hover:border-[var(--color-heading)]'
              } px-4 py-2`}
              style={{ fontWeight: 500 }}
            >
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
              Corretor
            </Link>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden flex items-center justify-between h-20">
          <Link href="/" aria-label="Ir para a home da UNUS">
            <Image
              src="/images/logo.webp"
              alt="UNUS"
              width={65}
              height={40}
              priority
              className={`h-9 w-auto object-contain transition-all duration-500 ${logoFilter}`}
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
              className="pt-2 pb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--gold-dark)]"
              style={{ fontWeight: 600 }}
            >
              Ver imóveis
            </p>
            {dropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-[13px] text-[var(--color-heading)] border-b border-[var(--neutral-100)] pl-3"
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
                  className="block py-3.5 text-[13px] text-[var(--color-heading)] border-b border-[var(--neutral-200)]"
                  style={{ fontWeight: 400 }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Favoritos + WhatsApp */}
            <div className="pt-5 flex flex-col gap-3">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[var(--color-action-whatsapp)] text-white py-3.5 text-[11px] uppercase tracking-[0.15em]"
                style={{ fontWeight: 500 }}
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Fale com um corretor
              </Link>
              <Link
                href="/favoritos"
                className="flex items-center justify-center gap-2 w-full bg-[var(--secondary-900)] text-white py-3.5 text-[11px] uppercase tracking-[0.15em]"
                style={{ fontWeight: 500 }}
              >
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                Favoritos
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
