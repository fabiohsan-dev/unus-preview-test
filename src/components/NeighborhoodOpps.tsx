import { ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function NeighborhoodOpps() {
  return (
    <section id="contato" className="relative py-32 lg:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://sdr-w.agenciaalea.com.br/Sala-UNUS-8.jpg"
          alt="Vista aérea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary-900)]/85" />
      </div>

      <div className="max-w-[800px] mx-auto relative z-10 text-center">
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-white" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white" style={{ fontWeight: 600 }}>
              Para Proprietários
            </span>
            <div className="w-8 h-[1px] bg-white" />
          </div>

          <h2 className="text-white text-[32px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.02em] mb-6" style={{ fontWeight: 300 }}>
            Seu patrimônio merece<br />
            <span style={{ fontWeight: 600 }}>inteligência de mercado.</span>
          </h2>

          <p className="text-white/50 text-[16px] sm:text-[17px] leading-relaxed max-w-[520px] mx-auto mb-12" style={{ fontWeight: 300 }}>
            Receba uma avaliação estratégica gratuita. Analisamos dados reais de transações da região para posicionar seu imóvel no patamar que ele merece — com discrição absoluta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="bg-white text-[var(--color-heading)] px-10 py-4 text-[12px] uppercase tracking-[0.15em] hover:bg-[var(--neutral-100)] transition-colors flex items-center gap-3"
              style={{ fontWeight: 600 }}
            >
              Solicitar Avaliação Gratuita
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="https://wa.me/554830666767"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 text-[12px] uppercase tracking-[0.15em] hover:bg-white/10 transition-colors flex items-center gap-3"
              style={{ fontWeight: 500 }}
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              Falar com Consultor
            </a>
          </div>

          <p className="text-white/30 text-[11px] mt-10 tracking-wide" style={{ fontWeight: 400 }}>
            Sigilo e discrição garantidos em todas as negociações.
          </p>
        </div>
      </div>
    </section>
  );
}