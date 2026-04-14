'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://unusnucleoimobiliario.com.br/wp-content/uploads/2021/07/xLogo_sm-1.png.pagespeed.ic.VQHWf0IouS.webp"
              alt="UNUS Núcleo Imobiliário"
              className={`h-10 lg:h-12 w-auto object-contain transition-all duration-500 ${
                transparent ? 'brightness-0 invert' : 'brightness-0'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
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

          {/* Favoritos */}
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

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors cursor-pointer ${
              transparent ? 'text-white' : 'text-[var(--color-heading)]'
            }`}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[var(--neutral-200)] overflow-hidden"
          >
            <div className="px-6 py-8 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-[15px] text-[var(--color-heading)] border-b border-[var(--neutral-200)]"
                  style={{ fontWeight: 400 }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link
                  href="/favoritos"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center bg-[var(--secondary-900)] text-white py-3.5 text-[12px] uppercase tracking-[0.15em]"
                  style={{ fontWeight: 500 }}
                >
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                  Favoritos
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
