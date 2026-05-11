'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { UnusLogo } from '@/components/ui';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[UNUS] Page error:', error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Logo */}
      <header className="w-full p-8 lg:p-12">
        <Link href="/" aria-label="Voltar para a home">
          <UnusLogo className="h-8 w-auto text-[var(--secondary-900)]" />
        </Link>
      </header>

      {/* Conteúdo */}
      <main className="flex-grow flex items-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-[560px]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[1px] bg-[var(--gold)]" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-caption)]"
              style={{ fontWeight: 600 }}
            >
              Erro inesperado
            </span>
          </div>

          <h1
            className="text-[40px] sm:text-[52px] text-[var(--color-heading)] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Algo correu{' '}
            <span className="italic text-[var(--gold)]" style={{ fontWeight: 600 }}>
              mal.
            </span>
          </h1>

          <p
            className="text-[16px] text-[var(--color-body)] leading-[1.8] mb-10 max-w-[440px]"
            style={{ fontWeight: 300 }}
          >
            Ocorreu um erro inesperado nesta página. Pode tentar recarregá-la
            ou voltar para a home e continuar a sua busca.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-3
                bg-[var(--secondary-900)] text-white
                text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                hover:bg-[var(--secondary-800)] transition-colors group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" strokeWidth={1.5} />
              Tentar novamente
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3
                border border-[var(--neutral-300)] text-[var(--color-heading)]
                text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4
                hover:border-[var(--secondary-900)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
              Voltar para a Home
            </Link>
          </div>
        </div>
      </main>

      {/* Rodapé discreto */}
      <footer className="p-8 lg:px-24 lg:pb-12">
        <p
          className="text-[11px] text-[var(--color-caption)]"
          style={{ fontWeight: 300 }}
        >
          Se o problema persistir, entre em{' '}
          <Link href="/contato" className="underline underline-offset-2 hover:text-[var(--color-heading)] transition-colors">
            contacto connosco
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
