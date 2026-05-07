'use client';

import Image from 'next/image';
import { ArrowRight, Building2, MapPin, Star, TrendingUp, User } from 'lucide-react';

const metrics = [
  { value: 'R$ 2.8bi', label: 'em ativos sob consultoria' },
  { value: '98%',      label: 'assertividade em avaliações' },
  { value: '464+',     label: 'famílias realizadas' },
];

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

export function VisitUs() {
  return (
    <section id="nucleo" className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--secondary-900)] text-white relative overflow-hidden">
      {/* Subtle bg texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Topo: brand statement */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-white" />
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-white"
              style={{ fontWeight: 600 }}
            >
              A Experiência UNUS
            </span>
            <div className="w-8 h-[1px] bg-white" />
          </div>
          <h2
            className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.02em] max-w-[700px] mx-auto mb-6 text-[var(--color-inverse)]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Não intermediamos.<br />
            <span style={{ fontWeight: 600 }}>Entregamos inteligência.</span>
          </h2>
          <p
            className="text-[var(--neutral-500)] text-[16px] sm:text-[17px] leading-relaxed max-w-[540px] mx-auto"
            style={{ fontWeight: 300 }}
          >
            Com presença em Balneário Camboriú e Itapema, a UNUS é o núcleo de referência em consultoria imobiliária de alto padrão no litoral catarinense. Dados, estratégia e uma rede exclusiva de relacionamento.
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/[0.08] mb-20 lg:mb-24">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`py-10 sm:py-12 text-center ${
                idx < metrics.length - 1
                  ? 'sm:border-r border-b sm:border-b-0 border-white/[0.08]'
                  : ''
              }`}
            >
              <p
                className="text-[36px] sm:text-[42px] text-[var(--color-inverse)] mb-2"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
              >
                {m.value}
              </p>
              <p
                className="text-[var(--neutral-500)] text-[12px] uppercase tracking-[0.12em]"
                style={{ fontWeight: 500 }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* 2 colunas: imagem + pilares */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Imagem sticky */}
          <div className="relative lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/Sala-UNUS-13.jpg"
                alt="Sede UNUS"
                fill
                quality={72}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute bottom-6 left-6 right-6 sm:right-auto px-6 py-4 border border-white/[0.12]"
              style={{
                background: 'rgba(10,10,10,0.55)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <p
                className="text-[9px] uppercase tracking-[0.25em] mb-1 text-white"
                style={{ fontWeight: 600 }}
              >
                Nossa Metodologia
              </p>
              <p
                className="text-[var(--color-inverse)] text-[13px] tracking-[0.04em]"
                style={{ fontWeight: 400 }}
              >
                5 pilares da UNUS
              </p>
            </div>
          </div>

          {/* Pilares */}
          <div>
            <div className="mb-12">
              <p
                className="text-[10px] uppercase tracking-[0.25em] mb-4 text-white"
                style={{ fontWeight: 600 }}
              >
                Por Que a UNUS
              </p>
              <h3
                className="text-[28px] sm:text-[34px] leading-[1.15] tracking-[-0.01em] text-[var(--color-inverse)] mb-4"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                Os 5 Pilares da Nossa<br />
                <span style={{ fontWeight: 600 }}>Inteligência Imobiliária</span>
              </h3>
              <p
                className="text-[var(--neutral-500)] text-[15px] leading-relaxed max-w-[420px]"
                style={{ fontWeight: 300 }}
              >
                Cada decisão é respaldada por dados, cada transação protegida por rigor — esse é o padrão UNUS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-14">
              {pilares.map(({ Icon, title, desc }) => (
                <div key={title} className="group relative">
                  <div className="w-11 h-11 rounded-[10px] border border-[var(--gold)]/[0.15] flex items-center justify-center mb-5 group-hover:bg-[var(--gold)]/[0.14] group-hover:border-[var(--gold)]/[0.25] transition-all duration-500 bg-white/[0.08]">
                    <Icon className="w-[18px] h-[18px] text-white" strokeWidth={1.3} />
                  </div>
                  <h4
                    className="text-white text-[13px] uppercase tracking-[0.1em] mb-2.5"
                    style={{ fontWeight: 600 }}
                  >
                    {title}
                  </h4>
                  <p
                    className="text-[var(--neutral-500)] text-[13px] leading-[1.7]"
                    style={{ fontWeight: 300 }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-white/[0.06] mb-10" />

            <a
              href="/o-nucleo"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] pb-2.5 border-b border-[var(--gold)]/25 hover:border-[var(--gold)]/70 transition-all duration-500 group text-white"
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
