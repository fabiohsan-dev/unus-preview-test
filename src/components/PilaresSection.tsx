import { Building2, MapPin, Star, TrendingUp, User } from 'lucide-react';

const pilares = [
  {
    Icon: User,
    title: 'Atendimento Personalizado',
    desc: 'Consultoria dedicada ao seu perfil, momento e objetivos. Cada cliente tem um corretor exclusivo.',
  },
  {
    Icon: Star,
    title: 'Excelência',
    desc: 'Padrão de alto nível em cada etapa — da busca ao fechamento, sem concessões na qualidade.',
  },
  {
    Icon: MapPin,
    title: 'Localizações',
    desc: 'Domínio profundo dos melhores bairros e regiões de Florianópolis e Grande Florianópolis.',
  },
  {
    Icon: Building2,
    title: 'Núcleo',
    desc: 'Ecossistema imobiliário único com equipe especializada, parcerias e inteligência de mercado.',
  },
  {
    Icon: TrendingUp,
    title: 'Mkt Digital',
    desc: 'Máxima exposição para os imóveis do portfólio com estratégia digital de alto alcance.',
  },
];

export function PilaresSection() {
  return (
    <section className="py-24 lg:py-28 px-6 sm:px-8 lg:px-12 bg-[var(--neutral-50)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[var(--gold)]" />
            <span
              className="text-[var(--gold-dark)] text-[10px] uppercase tracking-[0.3em]"
              style={{ fontWeight: 600 }}
            >
              Nossa Metodologia
            </span>
            <div className="w-6 h-[1px] bg-[var(--gold)]" />
          </div>
          <h2
            className="text-[var(--color-heading)] text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]"
            style={{ fontWeight: 300 }}
          >
            Os 5 pilares da{' '}
            <span style={{ fontWeight: 600 }}>UNUS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {pilares.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-start lg:items-center lg:text-center gap-4 p-6 bg-white border border-[var(--neutral-200)] hover:border-[var(--gold)]/40 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-300 shrink-0">
                <Icon className="w-5 h-5 text-[var(--gold-dark)]" strokeWidth={1.5} />
              </div>
              <div>
                <h3
                  className="text-[var(--color-heading)] text-[14px] mb-2 leading-snug"
                  style={{ fontWeight: 600 }}
                >
                  {title}
                </h3>
                <p
                  className="text-[var(--color-body)] text-[13px] leading-relaxed"
                  style={{ fontWeight: 300 }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
