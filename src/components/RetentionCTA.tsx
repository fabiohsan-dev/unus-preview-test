import { MessageCircle } from 'lucide-react';
import { LinkButton } from '@/components/ui';
import { whatsappUrl } from '@/lib/constants';

const WA_RETENTION = whatsappUrl('Olá! Ainda não encontrei o imóvel certo. Podem me ajudar?');

export function RetentionCTA() {
  return (
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

          <LinkButton
            href={WA_RETENTION}
            variant="whatsapp"
            size="md"
            external
            aria-label="Falar com um consultor UNUS pelo WhatsApp"
            className="shrink-0 max-sm:w-full !tracking-[0.20em] !text-[12px] !font-bold min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            Falar com um consultor
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
