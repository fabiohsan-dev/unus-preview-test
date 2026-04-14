'use client';

import { useState } from 'react';
import { MessageCircle, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FixedButtons() {
  const [consentOpen, setConsentOpen] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  return (
    <>
      {/* ── WHATSAPP — Bottom Right ── */}
      <motion.a
        href="https://wa.me/554830666767?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20imóveis%20da%20UNUS."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-[60] group"
        aria-label="Falar pelo WhatsApp"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--color-action-whatsapp)] animate-ping opacity-20" />
          <div className="relative w-14 h-14 rounded-full bg-[var(--color-action-whatsapp)] flex items-center justify-center shadow-[0_4px_20px_rgba(45,139,117,0.35)] hover:bg-[var(--success-dark)] transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.8} />
          </div>
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-4 py-2.5 shadow-[var(--shadow-elevated)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <p className="text-[var(--color-heading)] text-[12px]" style={{ fontWeight: 500 }}>
            Fale com um consultor
          </p>
          <p className="text-[var(--color-caption)] text-[10px]" style={{ fontWeight: 400 }}>
            Resposta em até 5 minutos
          </p>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
        </div>
      </motion.a>

      {/* ── CONSENT / LGPD — Bottom Left ── */}
      {!consentAccepted && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-[60]"
        >
          <AnimatePresence>
            {!consentOpen ? (
              <motion.button
                key="consent-pill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setConsentOpen(true)}
                className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl border border-[var(--color-border)] px-4 py-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group"
              >
                <Shield className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                <span className="text-[var(--color-heading)] text-[11px] uppercase tracking-[0.1em]" style={{ fontWeight: 600 }}>
                  Privacidade & Cookies
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="consent-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white border border-[var(--color-border)] shadow-[var(--shadow-elevated)] max-w-[400px] w-[calc(100vw-48px)]"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--neutral-200)]">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                    <span className="text-[var(--color-heading)] text-[12px] uppercase tracking-[0.1em]" style={{ fontWeight: 600 }}>
                      Termos de Consentimento
                    </span>
                  </div>
                  <button
                    onClick={() => setConsentOpen(false)}
                    className="w-7 h-7 flex items-center justify-center hover:bg-[var(--neutral-100)] transition-colors"
                    aria-label="Fechar termos de consentimento"
                  >
                    <X className="w-4 h-4 text-[var(--color-body)]" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <p className="text-[var(--color-body)] text-[13px] leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                    A UNUS Núcleo Imobiliário utiliza cookies e tecnologias similares para personalizar sua experiência,
                    analisar o tráfego do site e oferecer conteúdo relevante. Seus dados são tratados em conformidade
                    com a <a href="#" className="text-[var(--primary-500)] underline underline-offset-2">Lei Geral de Proteção de Dados (LGPD)</a>.
                  </p>
                  <p className="text-[var(--color-caption)] text-[12px] leading-relaxed mb-6" style={{ fontWeight: 400 }}>
                    Ao continuar navegando, você concorda com a nossa{' '}
                    <a href="#" className="text-[var(--primary-500)] underline underline-offset-2">Política de Privacidade</a> e{' '}
                    <a href="#" className="text-[var(--primary-500)] underline underline-offset-2">Termos de Uso</a>.
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setConsentAccepted(true);
                        setConsentOpen(false);
                      }}
                      className="flex-1 bg-[var(--secondary-900)] text-white py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-[var(--secondary-800)] transition-colors"
                      style={{ fontWeight: 600 }}
                    >
                      Aceitar Todos
                    </button>
                    <button
                      onClick={() => {
                        setConsentAccepted(true);
                        setConsentOpen(false);
                      }}
                      className="flex-1 border border-[var(--color-border)] text-[var(--color-body)] py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-[var(--neutral-100)] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      Apenas Essenciais
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
