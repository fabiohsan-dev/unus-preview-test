'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const metrics = [
  { value: '9+',  label: 'Anos de História'     },
  { value: '464', label: 'Famílias Realizadas'   },
  { value: '56.016 M²', label: 'Comercializados' },
];

const pilares = [
  {
    n: '1.',
    title: 'Trabalhamos com atendimento personalizado',
    desc: 'Contemos a equipe Premium. Muito qualificada em vendas! Pois um bom atendimento é o que nos move!',
  },
  {
    n: '2.',
    title: 'Excelência em cada etapa',
    desc: 'Desde o primeiro contato, assinatura do contrato, até o pós-venda, você tem uma grande diferença na maneira como conduzimos os processos de venda.',
  },
  {
    n: '3.',
    title: 'Localizações privilegiadas',
    desc: 'Sala aérea com vista para o mar no K-Platz Corporate, em Campinas - São José e uma loja no Somma Tower na Agronômica - Florianópolis. Ambientes pensados para oferecer conforto, sofisticação e excelência no atendimento aos nossos clientes.',
  },
  {
    n: '4.',
    title: 'Núcleo imobiliário',
    desc: 'Empresas e profissionais de serviços afiliados ao Núcleo, como arquitetos, móveis sob medida, gesso, box e fechamento de sacada, pintura e reforma, entre outros.',
  },
  {
    n: '5.',
    title: 'Mkt digital',
    desc: 'Curadoria de marketing com profissionais experts em ações de inteligência de mercado, com vídeos e produção diferenciadas para a divulgação do seu imóvel.',
  },
];

export function VisitUs() {
  return (
    <section
      id="nucleo"
      className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--secondary-900)] text-white relative overflow-hidden"
    >
      {/* Textura sutil */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ── Topo institucional ── */}
        <div className="text-center mb-16 lg:mb-20">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[var(--champagne)]/85" />
            <span className="text-text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--champagne)]/85">
              A Experiência UNUS
            </span>
            <div className="w-8 h-px bg-[var(--champagne)]/85" />
          </div>

          {/* Título */}
          <h2 className="font-serif font-light leading-[1.08] tracking-[-0.028em] text-[var(--color-inverse)] max-w-[980px] mx-auto mb-6 text-title-section">
            Imóveis certos, decisões rápidas e inteligência de mercado.
          </h2>

          {/* Subtítulo */}
          <p
            className="text-white/65 leading-[1.72] font-light max-w-[580px] mx-auto"
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
          >
            A UNUS é uma empresa moderna de inteligência imobiliária que atua com os melhores imóveis prontos, em construção ou em lançamento.
          </p>
        </div>

        {/* ── Métricas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/[0.08] mb-16 lg:mb-20">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`py-9 sm:py-11 text-center ${
                idx < metrics.length - 1
                  ? 'sm:border-r border-b sm:border-b-0 border-white/[0.08]'
                  : ''
              }`}
            >
              <p className="text-[var(--color-inverse)] text-4xl lg:text-[40px] font-serif font-medium leading-none tracking-[-0.02em] mb-1">
                {m.value}
              </p>
              <p className="text-white/60 text-[12px] font-medium uppercase tracking-[0.12em] leading-[1.45]">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Grid principal: imagem + pilares ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Imagem sticky */}
          <div className="relative lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/Sala-UNUS-13.jpg"
                alt="Sede UNUS — K-Platz Corporate, São José SC"
                fill
                quality={72}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Card sobre a imagem */}
            <div
              className="absolute bottom-6 left-6 right-6 sm:right-auto px-6 py-4 border border-white/[0.12]"
              style={{
                background: 'rgba(10,10,10,0.55)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] mb-1 text-white/60">
                Nossa sede
              </p>
              <p className="text-[var(--color-inverse)] text-[13px] font-normal tracking-[0.04em]">
                K-Platz Corporate — São José, SC
              </p>
            </div>
          </div>

          {/* Pilares */}
          <div>
            {/* Eyebrow + título dos pilares */}
            <div className="mb-12">
              <p className="text-text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] mb-4 text-white/60">
                Por que a UNUS
              </p>
              <h3 className="font-serif font-light leading-none tracking-[-0.026em] text-[var(--color-inverse)] mb-4 text-title-card">
                Os Pilares da Nossa{' '}
                <span className="font-semibold">Inteligência Imobiliária</span>
              </h3>
              <p className="text-white/55 text-[15px] leading-[1.62] font-light max-w-[420px]">
                Uma estrutura pensada para gerar confiança, diferenciação e desempenho em cada negociação.
              </p>
            </div>

            {/* Lista numerada editorial */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-11 gap-y-9 mb-12">
              {pilares.map(({ n, title, desc }, idx) => (
                <article
                  key={n}
                  className={`relative pt-5 border-t ${
                    idx < 2
                      ? 'border-[var(--champagne)]/35'
                      : 'border-white/[0.10]'
                  }`}
                >
                  <span
                    className="block font-serif text-[22px] font-medium tracking-[-0.02em] text-[var(--champagne)]/70 leading-none mb-3"
                  >
                    {n}
                  </span>
                  <h4
                    className="text-white/95 font-semibold uppercase tracking-[0.035em] leading-[1.28] mb-3 max-w-[360px] text-lg lg:text-xl"
                  >
                    {title}
                  </h4>
                  <p
                    className="text-white/65 font-light leading-[1.62] max-w-[390px] text-sm lg:text-base"
                  >
                    {desc}
                  </p>
                </article>
              ))}
            </div>

            <div className="w-full h-px bg-white/[0.06] mb-10" />

            {/* CTA */}
            <a
              href="/o-nucleo"
              className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] pb-2.5 border-b border-[var(--champagne)]/25 hover:border-[var(--champagne)]/70 transition-all duration-500 group text-white"
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
