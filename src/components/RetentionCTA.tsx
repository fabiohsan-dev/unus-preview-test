'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { PrivateSelectionPopup } from '@/components/PrivateSelectionPopup';

export function RetentionCTA() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section
        className="py-20 lg:py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden border-y border-[rgba(217,196,155,0.16)]"
        style={{
          background: `
            radial-gradient(circle at 16% 40%, rgba(194,168,120,0.12), transparent 30%),
            linear-gradient(135deg, var(--deep-blue) 0%, var(--deep-blue-700) 50%, var(--deep-blue-800) 100%)
          `,
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-7 text-center sm:text-left">
            <div>
              <p
                className="text-[var(--off-white)] text-[clamp(30px,3vw,46px)] leading-[1.14] tracking-[-0.02em] font-serif font-normal"
              >
                Ainda não encontrou o seu novo imóvel?
              </p>
              <p
                className="text-[var(--off-white)]/70 text-[15px] mt-2.5 font-light leading-[1.68]"
              >
                Chama a gente — nossos consultores encontram o imóvel certo para você.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              aria-label="Falar com um consultor UNUS pelo WhatsApp"
              className="shrink-0 max-sm:w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-7 text-[12px] font-bold uppercase tracking-[0.20em] text-white transition-all duration-200 hover:brightness-110"
              style={{ background: 'var(--color-action-whatsapp)' }}
            >
              <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              Falar com um consultor
            </button>
          </div>
        </div>
      </section>

      <PrivateSelectionPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
