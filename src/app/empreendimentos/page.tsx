import type { Metadata } from 'next';
import {
  getListarImoveisServer,
  getEmpreendimentoFotosServer,
  getEmpreendimentoStatsServer,
} from '@/lib/server/vistaService';
import { EmpreendimentoCard } from '@/components/EmpreendimentoCard';
import { ArrowRight } from 'lucide-react';
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

  // Busca fotos + estatísticas das sub-unidades em paralelo (tudo cacheado 1h)
  const enriched = await Promise.all(
    empreendimentos.map(async (emp) => {
      const empName = emp.Empreendimento || emp.TituloSite || '';
      const [fotos, stats] = await Promise.all([
        getEmpreendimentoFotosServer(emp.Codigo, 5),
        empName ? getEmpreendimentoStatsServer(empName) : Promise.resolve(null),
      ]);
      return {
        ...emp,
        FotosSlider: fotos,
        AggMinPreco:   stats?.minPreco   ?? undefined,
        AggMinSuites:  stats?.minSuites  ?? undefined,
        AggMaxSuites:  stats?.maxSuites  ?? undefined,
        AggMinArea:    stats?.minArea    ?? undefined,
        AggMaxArea:    stats?.maxArea    ?? undefined,
        AggDataEntrega: stats?.dataEntrega ?? undefined,
      };
    })
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* Hero */}
      <section className="bg-[var(--secondary-900)] pt-32 pb-20 px-6 sm:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-[var(--gold)]" />
            <span
              className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em]"
              style={{ fontWeight: 600 }}
            >
              Curadoria UNUS
            </span>
          </div>
          <h1
            className="text-white text-[40px] sm:text-[60px] leading-[1.02] tracking-[-0.02em] mb-5"
            style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
          >
            Empreen<span style={{ fontWeight: 600 }}>dimentos</span>
          </h1>
          <p
            className="text-white/55 text-[16px] leading-relaxed max-w-[520px]"
            style={{ fontWeight: 300 }}
          >
            Projetos cuidadosamente selecionados pela nossa curadoria imobiliária.
            Da planta ao pronto, encontre o empreendimento ideal para você.
          </p>
        </div>
      </section>

      {/* Barra de contagem */}
      <section className="bg-white border-b border-[var(--neutral-200)] px-6 sm:px-8 lg:px-16 py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-[13px] text-[var(--color-caption)] uppercase tracking-[0.15em]" style={{ fontWeight: 500 }}>
            <span className="text-[var(--color-heading)]" style={{ fontWeight: 600 }}>
              {empreendimentos.length}
            </span>{' '}
            empreendimentos disponíveis
          </p>
          <Link
            href="/venda"
            className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors"
            style={{ fontWeight: 500 }}
          >
            Ver imóveis avulsos
            <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Listagem */}
      <section className="py-20 px-6 sm:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {enriched.length > 0 ? (
            <div className="flex flex-col gap-8">
              {enriched.map((emp) => (
                <EmpreendimentoCard key={emp.Codigo} empreendimento={emp} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="text-[var(--color-caption)] text-[15px]">
                Nenhum empreendimento disponível no momento.
              </p>
              <Link
                href="/venda"
                className="mt-6 inline-flex items-center gap-2 text-[var(--primary-500)] text-[13px] uppercase tracking-[0.12em] hover:gap-3 transition-all"
                style={{ fontWeight: 500 }}
              >
                Ver todos os imóveis
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 px-6 sm:px-8 lg:px-16 bg-[var(--secondary-900)]">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--gold)]" />
            <span className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em]" style={{ fontWeight: 600 }}>
              Atendimento personalizado
            </span>
            <div className="w-8 h-[1px] bg-[var(--gold)]" />
          </div>
          <h2
            className="text-white text-[28px] sm:text-[40px] leading-[1.12] tracking-[-0.02em] mb-5"
            style={{ fontWeight: 300, fontFamily: 'var(--font-serif)' }}
          >
            Não encontrou o que <span style={{ fontWeight: 600 }}>procura?</span>
          </h2>
          <p className="text-white/50 text-[15px] leading-relaxed mb-10" style={{ fontWeight: 300 }}>
            Fale com um de nossos corretores e receba uma seleção personalizada
            de empreendimentos de acordo com o seu perfil.
          </p>
          <a
            href="https://wa.me/554830666767?text=Olá!%20Gostaria%20de%20conhecer%20os%20empreendimentos%20disponíveis%20na%20UNUS."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[var(--color-action-whatsapp)] text-white px-10 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[var(--color-action-whatsapp)]/90 transition-colors"
            style={{ fontWeight: 600 }}
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
