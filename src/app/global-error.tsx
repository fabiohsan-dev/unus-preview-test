'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/* global-error substitui o próprio root layout — precisa de <html> e <body> */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[UNUS] Global error:', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#F8F8F6' }}>
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Logo texto simples — sem dependência de componentes */}
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#1A1A1C',
              fontWeight: 600,
              marginBottom: '2rem',
            }}
          >
            UNUS Núcleo Imobiliário
          </p>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 300,
              color: '#1A1A1C',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Erro crítico
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: '#696A6C',
              lineHeight: 1.8,
              maxWidth: '400px',
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}
          >
            Ocorreu um erro grave na aplicação.
            Por favor, tente recarregar a página.
          </p>

          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#0D1F2D',
              color: '#fff',
              border: 'none',
              padding: '1rem 2.5rem',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  );
}
