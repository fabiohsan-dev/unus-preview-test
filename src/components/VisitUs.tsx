import { ArrowRight, Shield, BarChart3, Users, Award } from 'lucide-react';

const metrics = [
  { value: 'R$ 2.8bi', label: 'em ativos sob consultoria' },
  { value: '98%', label: 'assertividade em avaliações' },
  { value: '464+', label: 'famílias realizadas' },
];

const pillars = [
  {
    icon: <Shield className="w-[18px] h-[18px] text-white" strokeWidth={1.3} />,
    title: 'Segurança Jurídica',
    desc: 'Auditoria completa em cada etapa do negócio.',
  },
  {
    icon: <BarChart3 className="w-[18px] h-[18px] text-white" strokeWidth={1.3} />,
    title: 'Dados em Tempo Real',
    desc: 'Integração Vista CRM com análise preditiva de mercado.',
  },
  {
    icon: <Users className="w-[18px] h-[18px] text-white" strokeWidth={1.3} />,
    title: 'Rede Exclusiva',
    desc: 'Acesso direto a investidores qualificados e famílias de alto perfil.',
  },
  {
    icon: <Award className="w-[18px] h-[18px] text-white" strokeWidth={1.3} />,
    title: 'Curadoria Premium',
    desc: 'Cada imóvel é selecionado por critérios rigorosos de qualidade.',
  },
];

export function VisitUs() {
  return (
    <section id="nucleo" className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--secondary-900)] text-white relative overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Section: Brand Statement */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-white" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white" style={{ fontWeight: 600 }}>A Experiência UNUS</span>
            <div className="w-8 h-[1px] bg-white" />
          </div>
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.02em] max-w-[700px] mx-auto mb-6 text-[var(--color-inverse)]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
            Não intermediamos.<br />
            <span style={{ fontWeight: 600 }}>Entregamos inteligência.</span>
          </h2>
          <p className="text-[var(--neutral-500)] text-[16px] sm:text-[17px] leading-relaxed max-w-[540px] mx-auto" style={{ fontWeight: 300 }}>
            Com sede no K-Platz Corporate, a UNUS é o núcleo de referência em consultoria imobiliária de alto padrão em Santa Catarina. Dados, estratégia e uma rede exclusiva de relacionamento.
          </p>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/8 mb-20 lg:mb-24">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`py-10 sm:py-12 text-center ${
                idx < metrics.length - 1 ? 'sm:border-r border-b sm:border-b-0 border-white/8' : ''
              }`}
            >
              <p className="text-[36px] sm:text-[42px] text-[var(--color-inverse)] mb-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                {m.value}
              </p>
              <p className="text-[var(--neutral-500)] text-[12px] uppercase tracking-[0.12em]" style={{ fontWeight: 500 }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column: Image + Pillars */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative lg:sticky lg:top-24">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/Sala-UNUS-13.jpg"
                alt="Sede UNUS no K-Platz Corporate"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glassmorphism floating label */}
            <div
              className="absolute bottom-6 left-6 right-6 sm:right-auto px-6 py-4 border border-white/[0.12]"
              style={{
                background: 'rgba(10, 10, 10, 0.55)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <p className="text-[9px] uppercase tracking-[0.25em] mb-1 text-white" style={{ fontWeight: 600 }}>
                Nossa Sede
              </p>
              <p className="text-[var(--color-inverse)] text-[13px] tracking-[0.04em]" style={{ fontWeight: 400 }}>
                K-Platz Corporate · São José, SC
              </p>
            </div>
          </div>

          <div>
            {/* Section H2 Title above pillars */}
            <div className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.25em] mb-4 text-white" style={{ fontWeight: 600 }}>
                Por Que a UNUS
              </p>
              <h3
                className="text-[28px] sm:text-[34px] leading-[1.15] tracking-[-0.01em] text-[var(--color-inverse)] mb-4"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Os Pilares da Nossa<br />
                <span style={{ fontWeight: 600 }}>Inteligência Imobiliária</span>
              </h3>
              <p className="text-[var(--neutral-500)] text-[15px] leading-relaxed max-w-[420px]" style={{ fontWeight: 300 }}>
                Cada decisão é respaldada por dados, cada transação protegida por rigor — esse é o padrão UNUS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-14">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="group relative"
                >
                  {/* Icon container with subtle glow */}
                  <div className="w-11 h-11 rounded-[10px] border border-[#D4AF37]/[0.15] flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/[0.14] group-hover:border-[#D4AF37]/[0.25] transition-all duration-500 bg-white/[0.08]">
                    {p.icon}
                  </div>
                  <h4 className="text-white text-[13px] uppercase tracking-[0.1em] mb-2.5" style={{ fontWeight: 600 }}>
                    {p.title}
                  </h4>
                  <p className="text-[var(--neutral-500)] text-[13px] leading-[1.7]" style={{ fontWeight: 300 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/[0.06] mb-10" />

            <a
              href="#contato"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] pb-2.5 border-b border-[#D4AF37]/25 hover:border-[#D4AF37]/70 transition-all duration-500 group text-white"
              style={{ fontWeight: 500 }}
            >
              Conheça nossa metodologia
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}