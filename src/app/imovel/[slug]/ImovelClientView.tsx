'use client';

import Link from 'next/link';
import { ArrowLeft, Bath, BedDouble, Car, Ruler } from 'lucide-react';
import { formatarPreco, type VistaFoto, type VistaImovelDetalhe } from '@/lib/vistaApi';
import { ImovelGallery } from './ImovelGallery';
import { ImovelDetails, type ImovelSpec } from './ImovelDetails';
import { ImovelContact } from './ImovelContact';

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

type CorretorInfo = {
  NomeCorretor?: string;
  Nome?: string;
  Foto?: string;
  Celular?: string;
  Tipo?: string;
};

function isCorretorInfo(value: VistaImovelDetalhe['Corretor']): value is CorretorInfo {
  return Boolean(value) && !Array.isArray(value) && typeof value === 'object';
}

function getTransactionLabel(imovel: VistaImovelDetalhe) {
  const finalidade = cleanText(imovel.Finalidade);
  if (finalidade) return finalidade;
  const status = cleanText(imovel.Status);
  if (status) return status;
  return 'Venda';
}

function getPrimaryPrice(imovel: VistaImovelDetalhe, transactionLabel: string) {
  const locacao = Number(imovel.ValorLocacao ?? 0);
  const venda = Number(imovel.ValorVenda ?? 0);
  if (transactionLabel.toLowerCase().includes('loc') && locacao > 0) return imovel.ValorLocacao;
  if (venda > 0) return imovel.ValorVenda;
  return locacao > 0 ? imovel.ValorLocacao : imovel.ValorVenda;
}

function toParagraphs(value: string) {
  if (!value) return [];
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatMetricArea(value?: string) {
  const area = Number(value ?? 0);
  if (!Number.isFinite(area) || area <= 0) return '';
  return `${area.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} m2`;
}

export default function ImovelClientView({
  imovel,
  fotos,
}: {
  imovel: VistaImovelDetalhe;
  fotos: VistaFoto[];
}) {
  const transactionLabel = getTransactionLabel(imovel);
  const propertyRef = cleanText(imovel.Referencia) || imovel.Codigo;
  const title = cleanText(imovel.TituloSite) || `${cleanText(imovel.Categoria) || 'Imovel'} em ${cleanText(imovel.Bairro) || cleanText(imovel.Cidade) || 'SC'}`;
  const empreendimento = cleanText(imovel.Empreendimento);
  const location = [cleanText(imovel.Cidade), cleanText(imovel.Bairro)].filter(Boolean).join(', ') || 'Santa Catarina';
  const price = formatarPreco(getPrimaryPrice(imovel, transactionLabel));
  const condoPrice = Number(imovel.ValorCondominio ?? 0) > 0 ? `${formatarPreco(imovel.ValorCondominio)}/mes` : null;
  const descriptionParagraphs = toParagraphs(cleanText(imovel.DescricaoSite) || cleanText(imovel.Descricao));
  const infraestrutura = imovel.InfraestruturaLista ?? [];
  const caracteristicas = imovel.CaracteristicasLista ?? [];
  const corretor = isCorretorInfo(imovel.Corretor) ? imovel.Corretor : undefined;
  const agentName = corretor?.NomeCorretor || corretor?.Nome || 'Consultor UNUS';

  const specs: ImovelSpec[] = [
    ...(Number(imovel.Dormitorios) > 0 ? [{ icon: BedDouble, label: 'Quartos', value: imovel.Dormitorios! }] : []),
    ...(Number(imovel.BanheiroSocialQtd) > 0 ? [{ icon: Bath, label: 'Banheiros', value: imovel.BanheiroSocialQtd! }] : []),
    ...(Number(imovel.Suites) > 0 ? [{ icon: BedDouble, label: 'Suites', value: imovel.Suites! }] : []),
    ...(Number(imovel.Vagas) > 0 ? [{ icon: Car, label: 'Vagas', value: imovel.Vagas! }] : []),
    ...(Number(imovel.AreaPrivativa) > 0 ? [{ icon: Ruler, label: 'Area Privativa', value: formatMetricArea(imovel.AreaPrivativa) }] : []),
    ...(Number(imovel.AreaTotal) > 0 ? [{ icon: Ruler, label: 'Area Total', value: formatMetricArea(imovel.AreaTotal) }] : []),
  ];

  return (
    <div className="bg-[var(--color-background)] min-h-screen pt-20 lg:pt-24">
      <div className="bg-white border-b border-[var(--color-border)] px-6 sm:px-8 lg:px-12 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] text-[var(--color-caption)] uppercase tracking-[0.1em]" style={{ fontWeight: 500 }}>
            <Link href="/venda" className="min-h-11 flex items-center gap-1.5 hover:text-[var(--color-heading)] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              Voltar a busca
            </Link>
            <span className="mx-2 text-[var(--color-border)]">/</span>
            <span>{transactionLabel}</span>
            {cleanText(imovel.Cidade) && <><span className="mx-2 text-[var(--color-border)]">/</span><span>{cleanText(imovel.Cidade)}</span></>}
            {cleanText(imovel.Bairro) && <><span className="mx-2 text-[var(--color-border)]">/</span><span className="text-[var(--color-heading)]">{cleanText(imovel.Bairro)}</span></>}
          </div>
          <span className="text-[11px] text-[var(--color-caption)] uppercase tracking-[0.12em]" style={{ fontWeight: 500 }}>COD: {propertyRef}</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[63%] flex flex-col gap-8">
          <ImovelGallery fotos={fotos} propertyRef={propertyRef} />
          <ImovelDetails
            categoria={cleanText(imovel.Categoria)}
            transactionLabel={transactionLabel}
            empreendimento={empreendimento}
            title={title}
            location={location}
            specs={specs}
            condoPrice={condoPrice}
            descriptionParagraphs={descriptionParagraphs}
            caracteristicas={caracteristicas}
            infraestrutura={infraestrutura}
          />
        </div>

        <ImovelContact
          title={title}
          bairro={imovel.Bairro}
          propertyRef={propertyRef}
          transactionLabel={transactionLabel}
          price={price}
          condoPrice={condoPrice}
          agentName={agentName}
          agentPhoto={corretor?.Foto}
          corretorCelular={corretor?.Celular}
        />
      </main>
    </div>
  );
}
