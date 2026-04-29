import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/404-bg.png")' }}
      />
      
      {/* Logo Header */}
      <header className="relative z-10 w-full p-8 lg:p-12">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo.webp"
            alt="UNUS Núcleo Imobiliário"
            width={77}
            height={48}
            className="h-10 w-auto object-contain brightness-0"
            priority
          />
        </Link>
      </header>

      {/* Main Content - Positioned to the left to match the image composition */}
      <main className="relative z-10 flex-grow flex items-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-[600px] w-full text-left">
          <h1 
            className="text-[100px] sm:text-[140px] leading-none text-[var(--secondary-900)] opacity-10 mb-2 select-none"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            404
          </h1>
          <h2 
            className="text-[28px] sm:text-[42px] text-[var(--secondary-900)] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
          >
            Este endereço não foi encontrado.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[var(--secondary-500)] font-light leading-relaxed mb-10 max-w-[480px]">
            Mas boas oportunidades continuam por aqui.<br className="hidden sm:block" />
            Nossa curadoria imobiliária segue conectando<br className="hidden sm:block" />
            inteligência, patrimônio e localização estratégica.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-[var(--secondary-900)] text-[var(--secondary-900)] text-[12px] uppercase tracking-[0.15em] hover:bg-[var(--secondary-900)] hover:text-white transition-all duration-500"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar para a Home
            </Link>
            <Link 
              href="/venda"
              className="w-full sm:w-auto px-10 py-4 bg-[var(--secondary-900)] text-white text-[12px] uppercase tracking-[0.15em] hover:bg-[var(--primary-500)] transition-all duration-500 text-center"
              style={{ fontWeight: 600 }}
            >
              Explorar imóveis
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative z-10 w-full p-8 lg:px-24 lg:pb-12 mt-auto">
        <nav className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.2em] text-[var(--secondary-900)]/40 font-medium">
          <Link href="/venda" className="hover:text-[var(--secondary-900)] transition-colors flex items-center gap-1 group">
            Alto padrão <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="opacity-20 hidden sm:inline">|</span>
          <Link href="/venda" className="hover:text-[var(--secondary-900)] transition-colors flex items-center gap-1 group">
            Lançamentos <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="opacity-20 hidden sm:inline">|</span>
          <Link href="/anuncie" className="hover:text-[var(--secondary-900)] transition-colors flex items-center gap-1 group">
            Anuncie seu imóvel <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="opacity-20 hidden sm:inline">|</span>
          <Link href="/blog" className="hover:text-[var(--secondary-900)] transition-colors flex items-center gap-1 group">
            Insights do mercado <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </footer>
    </div>
  );
}
