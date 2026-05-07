'use client';

import { useState, type ElementType } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { WHATSAPP_BASE, PHONE_HREF, WA_IMOVEL } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
} from 'lucide-react';
import {
  formatarPreco,
  type VistaFoto,
  type VistaImovelDetalhe,
} from '@/lib/vistaApi';

/* ── Helpers Locais ── */
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
  })} m²`;
}

/* ── Subcomponentes ── */
function Gallery({ fotos, propertyRef }: { fotos: VistaFoto[]; propertyRef: string }) {
  const [active, setActive] = useState(0);
  const { isFavorited: favorited, toggle: toggleFavorite } = useFavorites(`imovel-${propertyRef}`);
  const images = fotos.length > 0 ? fotos : [{ URLArquivo: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80' }];
  const prev = () => setActive((index) => (index - 1 + images.length) % images.length);
  const next = () => setActive((index) => (index + 1) % images.length);

  return (
    <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-[var(--secondary-900)] group">
      <Image 
        src={images[active].URLArquivo || images[active].URL || images[active].Foto || ''} 
        alt="Imóvel" 
        fill
        priority
        className="object-cover transition-opacity duration-500" 
        sizes="(max-width: 1200px) 100vw, 70vw"
      />
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
        <span className="bg-white/90 backdrop-blur-md text-[var(--color-heading)] text-[10px] uppercase tracking-[0.2em] px-4 py-2 shadow-[var(--shadow-soft)]" style={{ fontWeight: 700 }}>Ref. {propertyRef}</span>
        <button type="button" onClick={toggleFavorite} className="w-11 h-11 bg-white/90 backdrop-blur-md flex items-center justify-center shadow-[var(--shadow-soft)] transition-all hover:bg-white" aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} aria-pressed={favorited}>
          <Heart className={`w-5 h-5 transition-colors ${favorited ? 'fill-[var(--color-error)] text-[var(--color-error)]' : 'text-[var(--color-body)]'}`} strokeWidth={1.5} />
        </button>
      </div>
      <button type="button" onClick={prev} className="absolute top-1/2 left-5 -translate-y-1/2 w-11 h-11 bg-white/80 backdrop-blur-md flex items-center justify-center text-[var(--color-heading)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-[var(--shadow-soft)]" aria-label="Foto anterior"><ChevronLeft className="w-5 h-5" /></button>
      <button type="button" onClick={next} className="absolute top-1/2 right-5 -translate-y-1/2 w-11 h-11 bg-white/80 backdrop-blur-md flex items-center justify-center text-[var(--color-heading)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-[var(--shadow-soft)]" aria-label="Próxima foto"><ChevronRight className="w-5 h-5" /></button>
      <div className="absolute bottom-5 left-5 flex gap-2.5 overflow-x-auto no-scrollbar">
        {images.map((foto, index) => (
          <button key={index} type="button" onClick={() => setActive(index)} className={`w-[110px] h-[72px] relative flex-shrink-0 overflow-hidden transition-all duration-300 ${active === index ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent opacity-100' : 'opacity-60 hover:opacity-90'}`} aria-label={`Abrir foto ${index + 1}`}>
            <Image 
              src={foto.FotoPequena || foto.URLArquivo || foto.URL || foto.Foto || ''} 
              alt="" 
              fill
              className="object-cover" 
              sizes="110px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string }) {
  return (
    <div className="bg-[var(--neutral-50)] border border-[var(--color-border)] p-5 flex flex-col items-center justify-center text-center gap-2">
      <Icon className="w-6 h-6 text-[var(--primary-500)]" strokeWidth={1.5} />
      <span className="text-[11px] text-[var(--color-caption)] uppercase tracking-[0.1em]" style={{ fontWeight: 600 }}>{label}</span>
      <span className="text-[var(--color-heading)] text-[18px]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

/* ── View Principal ── */
export default function ImovelClientView({
  imovel,
  fotos,
}: {
  imovel: VistaImovelDetalhe;
  fotos: VistaFoto[];
}) {
  const [activeTab, setActiveTab] = useState<'imovel' | 'condominio'>('imovel');
  const [descExpanded, setDescExpanded] = useState(false);

  const transactionLabel = getTransactionLabel(imovel);
  const propertyRef = cleanText(imovel.Referencia) || imovel.Codigo;
  const title = cleanText(imovel.TituloSite) || `${cleanText(imovel.Categoria) || 'Imóvel'} em ${cleanText(imovel.Bairro) || cleanText(imovel.Cidade) || 'SC'}`;
  const empreendimento = cleanText(imovel.Empreendimento);
  const location = [cleanText(imovel.Cidade), cleanText(imovel.Bairro)].filter(Boolean).join(', ') || 'Santa Catarina';
  const price = formatarPreco(getPrimaryPrice(imovel, transactionLabel));
  const condoPrice = Number(imovel.ValorCondominio ?? 0) > 0 ? `${formatarPreco(imovel.ValorCondominio)}/mes` : null;
  const descriptionParagraphs = toParagraphs(cleanText(imovel.DescricaoSite) || cleanText(imovel.Descricao));
  const infraestrutura = imovel.InfraestruturaLista ?? [];
  const caracteristicas = imovel.CaracteristicasLista ?? [];

  const corretor = isCorretorInfo(imovel.Corretor) ? imovel.Corretor : undefined;
  const agentName = corretor?.NomeCorretor || corretor?.Nome || 'Consultor UNUS';
  const agentPhoto = corretor?.Foto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80';
  const agentWhatsapp = corretor?.Celular
    ? `https://wa.me/55${corretor.Celular.replace(/\D/g, '')}?text=${encodeURIComponent(WA_IMOVEL(imovel.TituloSite ?? '', imovel.Bairro ?? ''))}`
    : `${WHATSAPP_BASE}?text=${encodeURIComponent(WA_IMOVEL(imovel.TituloSite ?? '', imovel.Bairro ?? ''))}`;

  const specs = [
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
            <Link href="/venda" className="flex items-center gap-1.5 hover:text-[var(--color-heading)] transition-colors">
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
          <Gallery fotos={fotos} propertyRef={propertyRef} />

          <div className="bg-white border border-[var(--color-border)] shadow-[var(--shadow-soft)]">
            <div className="p-8 pb-0">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-2 h-2 bg-[var(--primary-500)]" />
                <span className="text-[var(--color-accent-text)] text-[10px] uppercase tracking-[0.3em]" style={{ fontWeight: 700 }}>
                  {cleanText(imovel.Categoria)} para {transactionLabel}
                </span>
              </div>
              {empreendimento && <p className="text-[var(--color-heading)] text-[24px] md:text-[30px] leading-[1.1] tracking-[-0.02em] mb-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{empreendimento}</p>}
              <h1 className="text-[var(--color-heading)] text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-3" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{title}</h1>
              <div className="flex items-center gap-2 mb-8 text-[var(--color-body)]">
                <MapPin className="w-4 h-4 text-[var(--color-caption)]" strokeWidth={1.5} />
                <span className="text-[15px]" style={{ fontWeight: 300 }}>{location}</span>
              </div>
              <div className="flex gap-6 border-b border-[var(--color-border)]">
                {(['imovel', 'condominio'] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-[13px] uppercase tracking-[0.1em] relative transition-colors ${activeTab === tab ? 'text-[var(--color-heading)]' : 'text-[var(--color-caption)] hover:text-[var(--color-body)]'}`} style={{ fontWeight: activeTab === tab ? 700 : 500 }}>
                    {tab === 'imovel' ? 'Imóvel' : 'Condomínio'}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-500)]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 flex flex-col gap-10">
              <div className={`grid gap-3 ${specs.length >= 6 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
                {specs.map((spec) => <SpecCard key={spec.label} {...spec} />)}
              </div>

              {activeTab === 'imovel' ? (
                <>
                  <div>
                    <h3 className="text-[var(--color-heading)] text-[22px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>O imóvel</h3>
                    <div className={`space-y-4 overflow-hidden transition-all duration-500 ${descExpanded ? '' : 'max-h-[88px]'}`}>
                      {(descriptionParagraphs.length > 0 ? descriptionParagraphs : ['Descrição não disponível.']).map((p, i) => (
                        <p key={i} className="text-[var(--color-body)] text-[15px] leading-[1.8]" style={{ fontWeight: 300 }}>{p}</p>
                      ))}
                    </div>
                    {descriptionParagraphs.length > 1 && (
                      <button type="button" onClick={() => setDescExpanded(!descExpanded)} className="mt-4 flex items-center gap-1.5 text-[var(--color-accent-text)] text-[12px] uppercase tracking-[0.12em] hover:opacity-70 transition-opacity" style={{ fontWeight: 600 }}>
                        {descExpanded ? 'Ver menos' : 'Ler descrição completa'}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${descExpanded ? 'rotate-180' : ''}`} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                  {caracteristicas.length > 0 && (
                    <div>
                      <h3 className="text-[var(--color-heading)] text-[22px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Características</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {caracteristicas.map((c) => (
                          <div key={c} className="bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[14px] text-[var(--color-body)]">{c}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {condoPrice && (
                    <div className="bg-[var(--neutral-50)] border border-[var(--color-border)] px-5 py-4 flex items-center justify-between gap-4">
                      <span className="text-[var(--color-body)] text-[13px]">Taxa de condomínio</span>
                      <span className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 600 }}>{condoPrice}</span>
                    </div>
                  )}
                  {infraestrutura.length > 0 ? (
                    <div>
                      <h3 className="text-[var(--color-heading)] text-[22px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Infraestrutura</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {infraestrutura.map((inf) => (
                          <div key={inf} className="bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[14px] text-[var(--color-body)]">{inf}</div>
                        ))}
                      </div>
                    </div>
                  ) : <p className="text-[var(--color-body)] text-[15px]">Informações sobre infraestrutura em breve.</p>}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[37%]">
          <div className="sticky top-32 bg-white border border-[var(--color-border)] shadow-[var(--shadow-elevated)]">
            <div className="p-7 border-b border-[var(--color-border)]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-caption)] mb-2" style={{ fontWeight: 600 }}>{transactionLabel}</p>
              <p className="text-[var(--color-heading)] text-[40px] leading-none tracking-[-0.03em] mb-4" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{price}</p>
              {condoPrice && (
                <div className="flex items-center justify-between bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3">
                  <span className="text-[var(--color-body)] text-[13px]">Condomínio</span>
                  <span className="text-[var(--color-heading)] text-[14px]" style={{ fontWeight: 600 }}>{condoPrice}</span>
                </div>
              )}
            </div>

            <div className="p-7 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-4 mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={agentPhoto} alt={agentName} className="w-14 h-14 object-cover border border-[var(--color-border)]" />
                <div>
                  <p className="text-[var(--color-heading)] text-[14px]" style={{ fontWeight: 600 }}>{agentName}</p>
                  <p className="text-[var(--color-caption)] text-[11px] uppercase tracking-[0.08em] mt-0.5" style={{ fontWeight: 500 }}>Corretor especialista · UNUS</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <a href={corretor?.Celular ? `tel:+55${corretor.Celular.replace(/\D/g, '')}` : PHONE_HREF} className="flex-1 border border-[var(--color-border)] text-[var(--color-heading)] py-3 text-[11px] uppercase tracking-[0.12em] hover:bg-[var(--neutral-50)] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 600 }}><Phone className="w-4 h-4" /> Ligar</a>
                <a href={agentWhatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[var(--color-action-whatsapp)] text-white py-3 text-[11px] uppercase tracking-[0.12em] hover:bg-[var(--success-dark)] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 600 }}><MessageCircle className="w-4 h-4" /> WhatsApp</a>
              </div>
            </div>

            <div className="p-7">
              <h4 className="text-[var(--color-heading)] text-[18px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Agendar uma visita</h4>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Seu nome completo" className="w-full bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[13px] text-[var(--color-heading)] outline-none focus:border-[var(--secondary-900)] transition-colors" />
                <div className="flex gap-3">
                  <input type="email" placeholder="E-mail" className="w-full bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[13px] text-[var(--color-heading)] outline-none focus:border-[var(--secondary-900)] transition-colors" />
                  <input type="tel" placeholder="Telefone" className="w-full bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[13px] text-[var(--color-heading)] outline-none focus:border-[var(--secondary-900)] transition-colors" />
                </div>
                <button type="submit" className="w-full bg-[var(--secondary-900)] text-white py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--secondary-800)] transition-colors flex items-center justify-center gap-2 mt-1" style={{ fontWeight: 600 }}>Solicitar agendamento <ArrowRight className="w-4 h-4" /></button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
