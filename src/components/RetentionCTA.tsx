import { MessageCircle } from 'lucide-react';
import { LinkButton } from '@/components/ui';
import { whatsappUrl } from '@/lib/constants';

const WA_RETENTION = whatsappUrl('Olá! Ainda não encontrei o imóvel certo. Podem me ajudar?');

export function RetentionCTA() {
  return (
    <section className="py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-[var(--neutral-100)] border-y border-[var(--neutral-200)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p
              className="text-[var(--color-heading)] text-title-card leading-[1.2] font-serif font-normal"
            >
              Ainda não encontrou o seu novo imóvel?
            </p>
            <p
              className="text-[var(--color-body)] text-[15px] mt-2 font-light"
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
            className="shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            Falar com um consultor
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
