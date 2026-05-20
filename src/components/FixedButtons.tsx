'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Shield, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { whatsappUrl, WA_DEFAULT, PRIVACY_URL, COOKIES_URL } from '@/lib/constants';
import { loadConsent, saveConsent, type ConsentPrefs } from '@/lib/consent';

export function FixedButtons() {
  const [consentOpen, setConsentOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentPrefs | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = loadConsent();
    setConsent(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!consentOpen) return undefined;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setConsentOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [consentOpen]);

  const acceptAll = () => {
    const prefs = saveConsent({ analytics: true, marketing: true });
    setConsent(prefs);
    setConsentOpen(false);
  };

  const acceptEssential = () => {
    const prefs = saveConsent({ analytics: false, marketing: false });
    setConsent(prefs);
    setConsentOpen(false);
  };

  const bannerVisible = hydrated && consent === null;

  return (
    <>
      <motion.a
        href={whatsappUrl(WA_DEFAULT)}
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
          <p className="text-[var(--color-caption)] text-[10px]" style={{ fontWeight: 500 }}>
            Resposta em até 5 minutos
          </p>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
        </div>
      </motion.a>

      {hydrated && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-[60]"
        >
          <AnimatePresence>
            {bannerVisible && !consentOpen && (
              <motion.button
                key="consent-pill"
                ref={triggerRef}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setConsentOpen(true)}
                className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl border border-[var(--color-border)] px-4 py-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group"
                aria-expanded={consentOpen}
                aria-controls="consent-panel"
                aria-label="Abrir painel de privacidade e cookies"
              >
                <Shield className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                <span
                  className="text-[var(--color-heading)] text-[11px] uppercase tracking-[0.1em]"
                  style={{ fontWeight: 600 }}
                >
                  Privacidade & Cookies
                </span>
              </motion.button>
            )}

            {!bannerVisible && !consentOpen && (
              <motion.button
                key="consent-pill-accepted"
                ref={triggerRef}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setConsentOpen(true)}
                className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl border border-[var(--color-border)] px-4 py-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group"
                aria-expanded={consentOpen}
                aria-controls="consent-panel"
                aria-label="Gerenciar preferências de privacidade"
              >
                <Shield className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                <span
                  className="text-[var(--color-heading)] text-[11px] uppercase tracking-[0.1em]"
                  style={{ fontWeight: 600 }}
                >
                  Privacidade
                </span>
              </motion.button>
            )}

            {consentOpen && (
              <motion.div
                key="consent-panel"
                id="consent-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white border border-[var(--color-border)] shadow-[var(--shadow-elevated)] max-w-[400px] w-[calc(100vw-48px)]"
                role="region"
                aria-label="Consentimento de cookies"
                aria-labelledby="consent-title"
                aria-describedby="consent-description"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--neutral-200)]">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[var(--primary-500)]" strokeWidth={1.5} />
                    <span
                      id="consent-title"
                      className="text-[var(--color-heading)] text-[12px] uppercase tracking-[0.1em]"
                      style={{ fontWeight: 600 }}
                    >
                      Termos de Consentimento
                    </span>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => {
                      setConsentOpen(false);
                      requestAnimationFrame(() => triggerRef.current?.focus());
                    }}
                    className="w-7 h-7 flex items-center justify-center hover:bg-[var(--neutral-100)] transition-colors"
                    aria-label="Fechar termos de consentimento"
                  >
                    <X className="w-4 h-4 text-[var(--color-body)]" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="px-6 py-5">
                  <p
                    id="consent-description"
                    className="text-[var(--color-body)] text-[13px] leading-relaxed mb-4"
                    style={{ fontWeight: 300 }}
                  >
                    A UNUS Núcleo Imobiliário utiliza cookies e tecnologias similares para
                    personalizar sua experiência, analisar o tráfego do site e oferecer conteúdo
                    relevante. Seus dados são tratados em conformidade com a{' '}
                    <a
                      href={COOKIES_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent-text)] underline underline-offset-2"
                    >
                      Lei Geral de Proteção de Dados (LGPD)
                    </a>
                    .
                  </p>
                  <p
                    className="text-[var(--color-caption)] text-[12px] leading-relaxed mb-6"
                    style={{ fontWeight: 500 }}
                  >
                    Ao continuar navegando, você concorda com a nossa{' '}
                    <a
                      href={PRIVACY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent-text)] underline underline-offset-2"
                    >
                      Política de Privacidade
                    </a>{' '}
                    e com nossos termos de uso.
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={acceptAll}
                      className="flex-1 bg-[var(--secondary-900)] text-white py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-[var(--secondary-800)] transition-colors"
                      style={{ fontWeight: 600 }}
                    >
                      Aceitar Todos
                    </button>
                    <button
                      type="button"
                      onClick={acceptEssential}
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
