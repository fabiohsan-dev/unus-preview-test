'use client';

import { ChevronDown } from 'lucide-react';
import { useState, type ElementType } from 'react';

export interface ImovelSpec {
  icon: ElementType;
  label: string;
  value: string;
}

function SpecCard({ icon: Icon, label, value }: ImovelSpec) {
  return (
    <div className="bg-[var(--neutral-50)] border border-[var(--color-border)] p-5 flex flex-col items-center justify-center text-center gap-2">
      <Icon className="w-6 h-6 text-[var(--primary-500)]" strokeWidth={1.5} />
      <span className="text-[11px] text-[var(--color-caption)] uppercase tracking-[0.1em]" style={{ fontWeight: 600 }}>{label}</span>
      <span className="text-[var(--color-heading)] text-[18px]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export function ImovelDetails({
  categoria,
  transactionLabel,
  empreendimento,
  title,
  location,
  specs,
  condoPrice,
  descriptionParagraphs,
  caracteristicas,
  infraestrutura,
}: {
  categoria: string;
  transactionLabel: string;
  empreendimento: string;
  title: string;
  location: string;
  specs: ImovelSpec[];
  condoPrice: string | null;
  descriptionParagraphs: string[];
  caracteristicas: string[];
  infraestrutura: string[];
}) {
  const [activeTab, setActiveTab] = useState<'imovel' | 'condominio'>('imovel');
  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div className="bg-white border border-[var(--color-border)] shadow-[var(--shadow-soft)]">
      <div className="p-8 pb-0">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-2 h-2 bg-[var(--primary-500)]" />
          <span className="text-[var(--color-accent-text)] text-[10px] uppercase tracking-[0.3em]" style={{ fontWeight: 700 }}>
            {categoria} para {transactionLabel}
          </span>
        </div>
        {empreendimento && (
          <p className="text-[var(--color-heading)] text-[24px] md:text-[30px] leading-[1.1] mb-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
            {empreendimento}
          </p>
        )}
        <h1 className="text-[var(--color-heading)] text-[28px] md:text-[36px] leading-[1.1] mb-3" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
          {title}
        </h1>
        <p className="mb-8 text-[var(--color-body)] text-[15px]" style={{ fontWeight: 300 }}>
          {location}
        </p>
        <div className="flex gap-6 border-b border-[var(--color-border)]">
          {(['imovel', 'condominio'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-h-11 pb-4 text-[13px] uppercase tracking-[0.1em] relative transition-colors ${activeTab === tab ? 'text-[var(--color-heading)]' : 'text-[var(--color-caption)] hover:text-[var(--color-body)]'}`}
              style={{ fontWeight: activeTab === tab ? 700 : 500 }}
            >
              {tab === 'imovel' ? 'Imovel' : 'Condominio'}
              {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-500)]" />}
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
              <h3 className="text-[var(--color-heading)] text-[22px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>O imovel</h3>
              <div className={`space-y-4 overflow-hidden transition-all duration-500 motion-reduce:transition-none ${descExpanded ? '' : 'max-h-[88px]'}`}>
                {(descriptionParagraphs.length > 0 ? descriptionParagraphs : ['Descricao nao disponivel.']).map((paragraph, index) => (
                  <p key={index} className="text-[var(--color-body)] text-[15px] leading-[1.8]" style={{ fontWeight: 300 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {descriptionParagraphs.length > 1 && (
                <button type="button" onClick={() => setDescExpanded((current) => !current)} className="mt-4 min-h-11 flex items-center gap-1.5 text-[var(--color-accent-text)] text-[12px] uppercase tracking-[0.12em] hover:opacity-70 transition-opacity" style={{ fontWeight: 600 }}>
                  {descExpanded ? 'Ver menos' : 'Ler descricao completa'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${descExpanded ? 'rotate-180' : ''}`} strokeWidth={2} />
                </button>
              )}
            </div>
            {caracteristicas.length > 0 && (
              <div>
                <h3 className="text-[var(--color-heading)] text-[22px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Caracteristicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {caracteristicas.map((item) => (
                    <div key={item} className="bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[14px] text-[var(--color-body)]">{item}</div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {condoPrice && (
              <div className="bg-[var(--neutral-50)] border border-[var(--color-border)] px-5 py-4 flex items-center justify-between gap-4">
                <span className="text-[var(--color-body)] text-[13px]">Taxa de condominio</span>
                <span className="text-[var(--color-heading)] text-[15px]" style={{ fontWeight: 600 }}>{condoPrice}</span>
              </div>
            )}
            {infraestrutura.length > 0 ? (
              <div>
                <h3 className="text-[var(--color-heading)] text-[22px] mb-5" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Infraestrutura</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {infraestrutura.map((item) => (
                    <div key={item} className="bg-[var(--neutral-50)] border border-[var(--color-border)] px-4 py-3 text-[14px] text-[var(--color-body)]">{item}</div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[var(--color-body)] text-[15px]">Informacoes sobre infraestrutura em breve.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
