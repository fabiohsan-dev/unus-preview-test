'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Venda', href: '/venda' },
    { label: 'Anuncie seu Imóvel', href: '/anuncie' },
    { label: 'Blog', href: '/blog' },
    { label: 'O Núcleo', href: '/o-nucleo' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link href="/" className="flex items-center" aria-label="Ir para a home da UNUS">
            <img
              src="/images/logo.webp"
              alt="UNUS Núcleo Imobiliário"
              className={`h-10 lg:h-12 w-auto object-contain transition-all duration-500 ${
                transparent ? 'brightness-0 invert' : 'brightness-0'
              }`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[13px] tracking-[0.04em] transition-colors duration-300 hover:opacity-60 ${
                  transparent ? 'text-white/90' : 'text-[var(--color-heading)]'
                }`}
                style={{ fontWeight: 400 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/favoritos"
              className={`flex items-center gap-2 text-[13px] tracking-[0.04em] transition-colors duration-300 hover:opacity-60 ${
                transparent ? 'text-white/90' : 'text-[var(--color-heading)]'
              }`}
              style={{ fontWeight: 400 }}
            >
              <Heart className="w-4 h-4" strokeWidth={1.5} />
              Favoritos
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            className={`lg:hidden p-2 transition-colors cursor-pointer ${
              transparent ? 'text-white' : 'text-[var(--color-heading)]'
            }`}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[var(--neutral-200)] overflow-hidden"
        >
          <nav className="px-6 py-8 space-y-1" aria-label="Menu mobile">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 text-[15px] text-[var(--color-heading)] border-b border-[var(--neutral-200)]"
                style={{ fontWeight: 400 }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/favoritos"
                className="flex items-center justify-center gap-2 w-full text-center bg-[var(--secondary-900)] text-white py-3.5 text-[12px] uppercase tracking-[0.15em]"
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
