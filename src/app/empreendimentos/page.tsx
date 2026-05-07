import type { Metadata } from 'next';
import {
  getListarImoveisServer,
  getEmpreendimentoFotosServer,
  getEmpreendimentoStatsServer,
} from '@/lib/server/vistaService';
import { EmpreendimentoCard } from '@/components/EmpreendimentoCard';
import { ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Empreendimentos — Lançamentos e Novidades | UNUS Núcleo Imobiliário',
  description:
    'Conheça os empreendimentos de alto padrão selecionados pela UNUS em Florianópolis e São José. Lançamentos exclusivos com curadoria imobiliária.',
  openGraph: {
    title: 'Empreendimentos | UNUS Núcleo Imobiliário',
    description: 'Lançamentos e empreendimentos de alto padrão na Grande Florianópolis.',
    type: 'website',
  },
};

export default async function EmpreendimentosPage() {
  const data = await getListarImoveisServer({
    tipo: 'Empreendimento',
    limit: 50,
    page: 1,
  }).catch((err) => {
    console.error('[EmpreendimentosPage] falha ao buscar empreendimentos:', err);
    return { items: [], total: 0, paginas: 1, pagina: 1 };
  });

  const empreendimentos = data.items;

  const enriched = await Promise.all(
    empreendimentos.map(async (emp) => {
      const empName = emp.Empreendimento || emp.TituloSite || '';
      const [fotos, stats] = await Promise.all([
        getEmpreendimentoFotosServer(emp.Codigo, 5),
        empName ? getEmpreendimentoStatsServer(empName) : Promise.resolve(null),
      ]);
      return {
        ...emp,
        FotosSlider:    fotos,
        AggMinPreco:    stats?.minPreco    ?? undefined,
        AggMinSuites:   stats?.minSuites   ?? undefined,
        AggMaxSuites:   stats?.maxSuites   ?? undefined,
        AggMinArea:     stats?.minArea     ?? undefined,
        AggMaxArea:     stats?.maxArea     ?? undefined,
        AggDataEntrega: stats?.dataEntrega ?? undefined,
      };
    })
  );

  return (
    /* Fundo quente ivory — cria contraste dramático com os cards escuros */
    <div className="min-h-screen" style={{ background: 'var(--neutral-100)' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-24 px-6 sm:px-10 lg:px-20 overflow-hidden"
        style={{ background: 'var(--neutral-900)' }}
      >
        {/* Textura diagonal sutil */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C49A2E 0, #C49A2E 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Brilho radial central */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(196,154,46,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-[1360px] mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px]" style={{ background: 'var(--gold)' }} />
            <span
              className="uppercase tracking-[0.32em] text-[10px]"
              style={{ color: 'var(--gold)', fontWeight: 600 }}
            >
              Curadoria UNUS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1
                className="text-white leading-[1.0] tracking-[-0.025em] mb-6"
                style={{
                  fontWeight: 300,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(44px, 6vw, 80px)',
                }}
              >
                Empreen<span style={{ fontWeight: 600 }}>dimentos</span>
              </h1>
              <p
                className="text-[17px] leading-[1.75] max-w-[480px]"
                style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}
              >
                Projetos selecionados pela nossa curadoria imobiliária.
                Da planta ao pronto, encontre o empreendimento ideal.
              </p>
            </div>

            {/* Stat box */}
            <div
              className="shrink-0 px-8 py-6 border-l-2 lg:text-right"
              style={{ borderColor: 'var(--gold)' }}
            >
              <p
                className="text-[48px] leading-none mb-1"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}
              >
                {empreendimentos.length}
              </p>
              <p
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}
              >
                empreendimentos
              </p>
            </div>
          </div>
        </div>

        {/* Borda inferior dourada */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--gold) 0%, transparent 60%)' }}
        />
      </section>

      {/* ── Barra de navegação contextual ─────────────────── */}
      <div
        className="sticky top-0 z-20 px-6 sm:px-10 lg:px-20 py-3.5 border-b flex items-center justify-between"
        style={{
          background: 'var(--neutral-200)',
          borderColor: 'var(--neutral-300)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex items-center gap-3">
          <Building2 className="w-3.5 h-3.5" style={{ color: 'var(--gold-dark)' }} strokeWidth={1.5} />
          <span
            className="text-[12px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--neutral-700)', fontWeight: 500 }}
          >
            <span style={{ color: 'var(--neutral-900)', fontWeight: 700 }}>
              {empreendimentos.length}
            </span>{' '}
            empreendimentos disponíveis
          </span>
        </div>
        <Link
          href="/venda"
          className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors hover:opacity-70"
          style={{ color: 'var(--neutral-600)', fontWeight: 500 }}
        >
          Ver imóveis avulsos
          <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
        </Link>
      </div>

      {/* ── Listagem ──────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1360px] mx-auto">
          {enriched.length > 0 ? (
            <div className="flex flex-col gap-6">
              {enriched.map((emp) => (
                <EmpreendimentoCard key={emp.Codigo} empreendimento={emp} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="text-[15px]" style={{ color: 'var(--neutral-600)' }}>
                Nenhum empreendimento disponível no momento.
              </p>
              <Link
                href="/venda"
                className="mt-6 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] hover:gap-3 transition-all"
                style={{ color: 'var(--primary-500)', fontWeight: 500 }}
              >
                Ver todos os imóveis
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Bottom ────────────────────────────────────── */}
      <section
        className="relative py-28 px-6 sm:px-10 lg:px-20 overflow-hidden"
        style={{ background: 'var(--neutral-900)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(196,154,46,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 40%, var(--gold) 100%)' }}
        />

        <div className="relative max-w-[600px] mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-[1px] w-10" style={{ background: 'var(--gold)' }} />
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'var(--gold)', fontWeight: 600 }}
            >
              Atendimento personalizado
            </span>
            <div className="h-[1px] w-10" style={{ background: 'var(--gold)' }} />
          </div>

          <h2
            className="text-white leading-[1.1] tracking-[-0.02em] mb-5"
            style={{
              fontWeight: 300,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 44px)',
            }}
          >
            Não encontrou o que <span style={{ fontWeight: 600 }}>procura?</span>
          </h2>

          <p
            className="text-[16px] leading-[1.8] mb-10"
            style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}
          >
            Fale com nossos corretores e receba uma seleção personalizada
            de empreendimentos de acordo com o seu perfil.
          </p>

          <a
            href="https://wa.me/554830666767?text=Olá!%20Gostaria%20de%20conhecer%20os%20empreendimentos%20disponíveis%20na%20UNUS."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white px-10 py-4 text-[12px] uppercase tracking-[0.18em] transition-all hover:brightness-110"
            style={{ background: 'var(--color-action-whatsapp)', fontWeight: 600 }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar com um corretor
          </a>
        </div>
      </section>
    </div>
  );
}
